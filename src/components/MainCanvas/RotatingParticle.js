// initializing mouse and lastMouse position
const currMousePos = {x: window.innerWidth/2, y: window.innerHeight/2};
const lastMousePos = {x: currMousePos.x, y: currMousePos.y};

// adding the mousemove listener to track mouse position
export const updateMousePosForParticlesRotation = event =>
{
    const rect = event.target.getBoundingClientRect();
    currMousePos.x = event.clientX - rect.left;
    currMousePos.y = event.clientY - rect.top;
}

class Particle
{
    constructor( angle,distanceFromCenter,angularVelocity,color )
    {
        this.angle = angle;
        this.distanceFromCenter = distanceFromCenter;
        this.angularVelocity = angularVelocity;
        this.pos = {
            x: lastMousePos.x + Math.cos(this.angle) * distanceFromCenter.x,
            y: lastMousePos.y + Math.sin(this.angle) * distanceFromCenter.y
        };
        this.color = color;
    }

    updateAndDraw(context) 
    {
        // storing last pos 
        const lastPos = { x: this.pos.x, y: this.pos.y };
        // updating the lastMousePos to enable drag effect by just updating fraction at a time
        lastMousePos.x += (currMousePos.x - lastMousePos.x) * 0.005;
        lastMousePos.y += (currMousePos.y - lastMousePos.y) * 0.005;
        // updating the angle and the pos
        this.angle += this.angularVelocity;
        this.pos.x = lastMousePos.x + Math.cos(this.angle) * this.distanceFromCenter.x;
        this.pos.y = lastMousePos.y + Math.sin(this.angle) * this.distanceFromCenter.y;
        // calling the draw function
        this.draw( context,lastPos );
    }

    draw( context,lastPos )
    {
        context.beginPath();
        context.moveTo( this.pos.x,this.pos.y );
        context.lineTo( lastPos.x,lastPos.y );
        context.strokeStyle = this.color;
        context.lineWidth = 3.5;
        context.stroke();
    };
}

export default Particle;