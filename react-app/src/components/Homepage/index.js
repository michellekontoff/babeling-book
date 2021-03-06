import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import LoginFormModal from "../auth/LoginFormModal";
import SignUpFormModal from "../auth/SignUpFormModal";
import about from "../../images/about.jpg";
import "./homepage.css";
import Footer from "../Footer";

export default function Homepage() {
   const user = useSelector((state) => state.session.user);

   if (user) {
      return <Redirect to={`/posts/latest`} />;
   }

   return (
      <div className="homepage-container">
         <div className="header">
            <div className="header__welcome">
               <div className="header__welcome-babeling">Babeling</div>
               <div className="header__welcome-book">Book</div>
            </div>
            <div className="header__buttons">
               <LoginFormModal />
               <SignUpFormModal />
            </div>
         </div>
         <div className="about">
            <div className="about__message">
               Babeling Book is a blogging site for people who want to practice
               writing about the things they care about in a language they want
               to learn. You can make posts and leave comments. The difference
               between Babeling Book and other blogging sites is here users are{" "}
               <i>encouraged</i> to offer each other corrections to grammar and
               spelling. In the future, you'll be able to follow other users and have a personal feed of posts from the users you follow.
               <p>
                  <LoginFormModal /> or <SignUpFormModal /> to see more!
               </p>
            </div>
            <div className="about__img-container">
               <img className="about__img" src={about} alt="img"></img>
            </div>
         </div>
         <div>
            <Footer />
         </div>
      </div>
   );
}
