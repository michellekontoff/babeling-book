import React from "react";

import github from "../../images/github-logo.png";
import linkedin from "../../images/linkedin-logo.png";
import email from "../../images/gmail-logo.png";

import "./footer.css";

export default function Footer() {
   return (
      <div className="footer">
         Developed by
         <span>Michelle Kontoff</span>
         <div className="footer__logos">
            <a href="https://github.com/michellekontoff">
               <img src={github} height="48" alt="github logo" />
            </a>

            <a href="mailto:mlkontoff@gmail.com">
               <img
                  className="gmail-logo"
                  src={email}
                  height="49"
                  alt="gmail logo"
               />
            </a>

            <a href="https://www.linkedin.com/in/michelle-kontoff-149866132/">
               <img src={linkedin} height="50" alt="linkedin logo" />
            </a>
         </div>
      </div>
   );
}
