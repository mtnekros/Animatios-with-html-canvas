const currMousePos = { x: -100,y:-100}

export const updateMousePosForFloatingDots = event =>
{
    const rect = event.target.getBoundingClientRect();
    currMousePos.x = event.clientX - rect.left;
    currMousePos.y = event.clientY - rect.top;
}

const getDistanceBetween = ( x1,y1,x2,y2 ) => 
{
    return Math.sqrt( (x1-x2)**2 + (y1-y2)**2 );
}

class FloatingDot
{
    static maxRadius = 40;
    constructor( x,y,radius,dx,dy,color )
    {
        this.center = {x: x, y: y};
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.originalRadius = radius;
        this.color = color;
    }
    
    handleWallCollision( canvas )
    {
        if ( this.center.x-this.radius < 0 || this.center.x+this.radius > canvas.width )
        {
            this.dx = -this.dx;
        }
        if ( this.center.y-this.radius < 0 || this.center.y+this.radius > canvas.height )
        {
            this.dy = -this.dy;
        }
    }

    growBy(amt=1)
    {
        this.radius += amt;
    }
    updateAndDraw( canvas,context )
    {
        this.handleWallCollision( canvas );
        // update the center
        this.center.x += this.dx;
        this.center.y += this.dy;

        // increasing dot if it comes near the mousePos and decreasing if it goes
        const mouseDotDistance = getDistanceBetween( this.center.x,this.center.y,currMousePos.x,currMousePos.y );
        if ( mouseDotDistance < 100 && this.radius < FloatingDot.maxRadius )
        {
            this.growBy(1);
        }
        if ( mouseDotDistance > 100 && this.radius > this.originalRadius )
        {
            this.growBy(-1);
        }
        // drawing
        this.draw( context );
    }
    draw( context )
    {
        context.beginPath();
        context.arc( this.center.x,this.center.y,this.radius,0,2*Math.PI );
        context.fillStyle = this.color;
        context.fill();
    }
}

export default FloatingDot;