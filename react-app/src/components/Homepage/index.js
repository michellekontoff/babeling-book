import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import welcome from '../../images/welcome_v2.png'
import about from '../../images/about.jpg'
import './homepage.css'

export default function Homepage() {
    const user = useSelector(state => state.session.user);

    if (user) {
        return <Redirect to={`/users/${user.id}`} />;
      }

    return (
        <div className='homepage-container'>
            <div className='header'>
                <div className='header__welcome'>
                    Babeling Book
                </div>
                <div className='header__buttons'>
                    <button>Log In</button>
                    <button>Sign Up</button>
                </div>
            </div>
            <div className='about'>
                <div className='about__img-container'>
                    <img className='about__img' src={about} alt='img'></img>
                </div>
                <div className='about__message'>
                    Babeling Book is a blogging site for people who want to practice writing about the things they care about in a language they want to learn. You can make posts and leave comments. The difference between Babeling Book and other blogging sites is here users are <i>encouraged</i> to offer each other corrections to grammar and spelling. Verified members of the community (coming soon), can even make corrections through annotations on a post, making their notes easy read side-by-side with the post, and viewable to other users who want to learn from your post.

                    <p>Log in or sign up to see more!</p>
                </div>
            </div>
        </div>
    )
}
