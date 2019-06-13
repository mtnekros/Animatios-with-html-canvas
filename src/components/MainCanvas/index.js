import React, { Component,createRef }from 'react';
import './canvas.css';
import RotatingParticle,{ updateMousePosForParticlesRotation } from './RotatingParticle';
import FloatingDot,{ updateMousePosForFloatingDots } from './FloatingDot';
import Orbit from './Orbit';

// get Random From Range
export const getRandomFromRange = ( start,end ) =>
{
    return Math.random()*(end-start) + start;
}

class SpinningParticles extends Component 
{
    constructor()
    {
        super();
        this.canvasRef = createRef();
    }

    componentDidMount()
    {
        const canvas = this.canvasRef.current;
        // setting canvas width and height to the window width and height
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        // getting the context
        const context = canvas.getContext('2d');
        
        // creating rotating particles
        const rotatingParticles = [];
        const nParticles = 30;
        const colors = [ "#F23326","#F29926","#E5F226","#7FF226","#26F233","#26F299" ];
        for ( let i= 0; i < nParticles; i++ )
        {
            const angle = 0;
            const distanceFromCenter = {x: getRandomFromRange( 120,250 ), y: getRandomFromRange( 120,250 )};
            const angularVelocity = getRandomFromRange( -0.08,0.08 );
            const color = colors[ i%colors.length ];

            rotatingParticles.push( new RotatingParticle( angle,distanceFromCenter,angularVelocity,color ) );
        }

        // creating the dots
        const floatingDots = [];
        for ( let i = 0; i < 30; i++ )
        {
            //  setting x,y,radius,dx,dy,color 
            const x = getRandomFromRange( 0,canvas.width );
            const y = getRandomFromRange( 0,canvas.height );
            const dx = getRandomFromRange( -2,2 );
            const dy = getRandomFromRange( -2,2 );
            const radius = getRandomFromRange( 3,10 );
            const color = colors[ i%colors.length ];

            floatingDots.push( new FloatingDot( x,y,radius,dx,dy,color ) );
        }

        // creating the fractal spirograph orbits // center,radius,angularVel
        let spirographPoints = [];
        const sun = new Orbit( { x: canvas.width/2, y: canvas.height/2 }, 160, 0.001 );
        // adding child to orbit
        let next = sun;
        for (let i = 0; i < 5; i++ )
        {
            next.addChild();
            next = next.child;
        }

        const animate = () =>
        {
            // request run this function again and again 
            requestAnimationFrame( animate );

            // create the particle trail by not clearing everthing right away but gradually over time
            context.fillStyle = 'rgba( 80,80,80,0.08 )'
            context.fillRect( 0,0,canvas.width,canvas.height );
            // context.clearRect( 0,0,canvas.width,canvas.height );
            
            // adding new point from the last child's center to list
            for ( let i = 0; i < 10; i++ )
            {
                const newSpiroPoint = sun.updateChild();

                spirographPoints.push( newSpiroPoint );
                if ( spirographPoints.length > 5500 )
                {
                    spirographPoints.shift();
                }
            }
            // draw the spirograph
            context.beginPath();
            context.moveTo( spirographPoints[0].x,spirographPoints[0].y );
            for ( let i = 0; i < spirographPoints.length; i++ )
            {
                context.lineTo( spirographPoints[i].x,spirographPoints[i].y );
            }
            context.strokeStyle = "whitesmoke";
            context.lineWidth = 2;
            context.stroke();
            // draw the spirograph drawer
            // sun.show( context );

            // // update function for all three animations
            rotatingParticles.forEach( particle => particle.updateAndDraw(context) );
            floatingDots.forEach( dot => dot.updateAndDraw( canvas,context ) );

        }
        animate();
    }

    updateMousePos = event =>
    {
        updateMousePosForParticlesRotation(event);
        updateMousePosForFloatingDots(event);
    }

    render()
    {
        return (
            <canvas onMouseMove={this.updateMousePos} ref={this.canvasRef} />
        );
    }
}

export default SpinningParticles;