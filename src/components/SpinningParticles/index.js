import React, { Component,createRef }from 'react';
import './canvas.css';
import Particle,{ updateMousePosForParticlesRotation } from './Particle';
import Dot from '../FloatingDots/Dot';
import { updateMousePosForFloatingDots } from '../FloatingDots/Dot';

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
        const c = canvas.getContext('2d');

        // creating rotating particles
        const particles = [];
        const nParticles = 100;
        const colors = [ "#7DCEA0","#7DCEC9","#7DABCE","#7D82CE","#A07DCE","#C87DCE" ]
        for ( let i= 0; i < nParticles; i++ )
        {
            const angle = 0;
            const distanceFromCenter = {x: getRandomFromRange( 120,250 ), y: getRandomFromRange( 120,250 )};
            const angularVelocity = getRandomFromRange( -0.08,0.08 );
            const color = colors[ i%colors.length ];

            particles.push( new Particle( angle,distanceFromCenter,angularVelocity,color ) );
        }

        const animate = () =>
        {
            // request run this function again and again 
            requestAnimationFrame( animate );

            // create the particle trail by not clearing everthing right away but gradually over time
            c.fillStyle = 'rgba( 50,50,50,0.15 )'
            c.fillRect( 0,0,canvas.width,canvas.height );
            // c.clearRect( 0,0,canvas.width,canvas.height );

            // update function
            particles.forEach( particle => particle.updateAndDraw(c) );
        }
        animate();
    }

    updateMousePos = event =>
    {
        updateMousePosForParticlesRotation(event);
    }

    render()
    {
        return (
            <canvas onMouseMove={this.updateMousePos} ref={this.canvasRef} />
        );
    }
}

export default SpinningParticles;