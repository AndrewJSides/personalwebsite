import react, { useState, useEffect } from "react";

import { routes } from "../../utils/constants";
import type { route } from "../../utils/constants";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const MenuBarContainer = () => {
  const headers = []; //["ABOUT", "PORTFOLIO", "SCHOOL"];

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const menuItems = document.querySelectorAll(
      "#menu-item"
    ) as NodeListOf<HTMLElement>;
    menuItems.forEach((item) => {
      // name is the text of the menu item
      const name = item.innerText;
      item.addEventListener("mouseover", () => {
        // add a white underline to the menu item
        item.style.textDecoration = "underline";
        // select all other menu items and gray them out
        const otherMenuItems = Array.from(menuItems).filter(
          (i) => i !== item
        ) as HTMLElement[];
        let op = 1;
        const intv = setInterval(() => {
          otherMenuItems.forEach((i) => {
            i.style.opacity = op.toString();
          });
          op -= 0.2;
          if (op < 0.2) {
            clearInterval(intv);
          }
        }, 50);
        let iterations = 0;
        const interval = setInterval(() => {
          item.innerText = name
            .split("")
            .map((l: string, index: number) => {
              if (index < iterations) {
                return name.charAt(index);
              } else {
                return letters[Math.floor(Math.random() * 26)];
              }
            })
            .join("");

          if (iterations > 10) {
            clearInterval(interval);
          } else {
            iterations += 1 / 2;
          }
        }, 30);
      });

      item.addEventListener("mouseout", () => {
        menuItems.forEach((item, index) => (item.innerText = headers[index]));
        // remove the white underline from the menu item
        item.style.textDecoration = "none";

        // select all other menu items and fade them back int
        const otherMenuItems = Array.from(menuItems).filter(
          (i) => i !== item
        ) as HTMLElement[];
        let op = 0.2;
        const interval = setInterval(() => {
          otherMenuItems.forEach((i) => {
            i.style.opacity = op.toString();
          });
          op += 0.2;
          if (op > 1) {
            clearInterval(interval);
          }
        }, 50);
      });
    });
  });

  const renderRoutes = () => {
    return routes.map((r: route) => {
      return (
        <a
          key={r.id}
          id="menu-item"
          href={r.path}
          className="flex justify-center cursor-pointer justify-center py-2 px-8 mx-2 text-white font-bold rounded-xl hover:bg-white/60 items-center"
        >
          {r.name}
        </a>
      );
    });
  };
  return (
    <div className="flex flex-col items-center text-center bg-black text-white p-4 font-mono">
      {/* <div
        id="name"
        className="flex items-center w-1/12 mx-4 min-w-fit text-center whitespace-nowrap"
      > */}
      <p className="flex flex-row items-center text-2xl">
        ANDREW SIDES{" "}
        <a
          className="ml-2"
          target="_blank"
          href="https://linkedin.com/in/andrewjsides"
          rel="noreferrer"
        >
          <AiFillLinkedin />
        </a>
        <a
          className="ml-2"
          target="_blank"
          href="https://github.com/AndrewJSides"
          rel="noreferrer"
        >
          <AiFillGithub />
        </a>
      </p>
      <p className="text-md">Software Engineer at Walmart Global Tech</p>
      {/* </div> */}
      {/* <div className="flex justify-evenly w-11/12 min-w-fit">
        {renderRoutes()}
      </div> */}
    </div>
  );
};

export default MenuBarContainer;
