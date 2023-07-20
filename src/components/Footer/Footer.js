import { useState } from "react";
import { useEffect } from "react"

export const Footer = () => {
    const [theme, setTheme] = useState();
    const currentTheme = localStorage.getItem("theme");
    useEffect(()=>{
        setTheme(currentTheme)
    })
    return (
        <footer className={`footer p-10 text-base-content ${theme == "light" ? "bg-[#f2f1ee]" : "bg-[#27282b]"}`}>
            <div className="">
                <span className="footer-title">Services</span>
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </div>
            <div>
                <span className="footer-title">Company</span>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </div>
            <div>
                <span className="footer-title">Legal</span>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </div>
            <div>
                <span className="footer-title">Get Into Contact</span>
                <div className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Enter your email address</span>
                    </label>
                    <div className={`relative w-72`}>
                        <input type="text" placeholder="username@site.com" className={`input input-bordered w-full pr-16 outline-none ${theme == "light" ? "bg-[#f2f1ee]" : "bg-[#27282b]"} `} />
                        <button className="btn bg-[#ff462e] text-[#39393a] absolute top-0 right-0 rounded-l-none ">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}