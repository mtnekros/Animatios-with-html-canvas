import React, { Component,createRef } from 'react';
import Dot, { updateMousePosForFloatingDots } from './Dot';
import { getRandomFromRange } from '../SpinningParticles';

class FloatingDots extends Component
{
    constructor( props )
    {
        super( props );
        this.canvasRef = createRef();
        
    }
    componentDidMount()
    {
        // getting canvas from ref and setting width and height
        const canvas = this.canvasRef.current;
        canvas.width = window.innerWidth/2;
        canvas.height = window.innerHeight;

        // geting the context
        const context = canvas.getContext( '2d' );

        // creating the dots
        const dots = [];
        const colors = [ "#F23326","#F29926","#E5F226","#7FF226","#26F233","#26F299" ];
        for ( let i = 0; i < 150; i++ )
        {
            //  x,y,radius,dx,dy,color 
            const x = getRandomFromRange( 0,canvas.width );
            const y = getRandomFromRange( 0,canvas.height );
            const dx = getRandomFromRange( -2,2 );
            const dy = getRandomFromRange( -2,2 );
            const radius = getRandomFromRange( 3,10 );
            const color = colors[ i%colors.length ];

            dots.push( new Dot( x,y,radius,dx,dy,color ) );
        }

        const animate = () =>
        {
            requestAnimationFrame( animate );
            // console.log( context );
            context.fillStyle = "rgba(110,0,0,0.3)"
            context.fillRect( 0,0,canvas.width,canvas.height );
            // drawing
            dots.forEach( dot => dot.updateAndDraw( canvas,context ) );
            
        }
        
        animate();
    }
    render()
    {
        return <canvas onMouseMove={updateMousePosForFloatingDots} ref={this.canvasRef} />
    }
}

export default FloatingDots;