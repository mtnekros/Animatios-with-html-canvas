class Orbit 
{
    constructor( center,radius,angularVelocity )
    {
        this.center = { x: center.x, y: center.y };
        this.lastCenter = { x: center.x, y: center.y };
        this.lastLastCenter = { x: center.x, y: center.y }
        this.radius = radius;
        this.angle = 0;
        this.angularVelocity = angularVelocity;
        this.child = null;
    }
    addChild()
    {
        const childRadius = this.radius / 3;
        const childCenter = {
            x: this.center.x + this.radius + childRadius,
            y: this.center.y
        }
        this.child = new Orbit( childCenter,childRadius,-this.angularVelocity*6 )
    }
    updateChild()
    {
        if ( this.child != null )
        {
            const distanceBetweenCenters = this.radius + this.child.radius;
            // updating lastLastCenter
            this.child.lastLastCenter.x = this.child.lastCenter.x;
            this.child.lastLastCenter.y = this.child.lastCenter.y;
            // updating lastCenter
            this.child.lastCenter.x = this.child.center.x;
            this.child.lastCenter.y = this.child.center.y;
            // updating the angle and child's center
            this.angle += this.angularVelocity;
            this.child.center.x = this.center.x + distanceBetweenCenters*Math.cos( this.angle );
            this.child.center.y = this.center.y + distanceBetweenCenters*Math.sin( this.angle );  
            // recursively updating child's child
            return this.child.updateChild();
        }
        return {x: this.center.x,y: this.center.y };
    }
    show( context )
    {
        context.beginPath();
        context.arc( this.center.x,this.center.y,this.radius,0,2*Math.PI );
        context.lineWidth = 1;
        context.strokeStyle = "rgba(0,0,0,1)";
        context.stroke();
        
        if ( this.child != null)
        {
            this.child.show( context );            
        }
    }
    showSpirograph( context )
    {
        // debugger;
        if ( this.child === null)
        {
            context.beginPath();
            context.moveTo( this.lastLastCenter.x,this.lastLastCenter.y );
            context.lineTo( this.lastCenter.x,this.lastCenter.y );
            context.lineTo( this.center.x,this.center.y );
            context.lineWidth = 2;
            context.strokeStyle = "white";
            context.stroke();
            return;
        }
        this.child.showSpirograph( context );
    }
};

export default Orbit;