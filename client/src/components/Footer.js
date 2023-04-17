import React from "react";

function Footer() {
  return (
    <div>
      <footer className="flex justify-center items-center mb-4">
        <p>
          brought to you by{" "}
          <span className="text-cyan-700 border-b-2 border-rose-400">
            <a
              href="https://github.com/box-o-water/the_pet_people/"
              target="_blank"
              rel="noreferrer"
            >
              the pet people team
            </a>
          </span>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
