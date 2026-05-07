'use client'
import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link';
import { IconUpload, IconWand, IconShare, IconMail, IconArrowRight, IconSparkles, IconNotes, IconCheck } from '@tabler/icons-react';

const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-[#0b0c10] min-h-screen text-slate-900 dark:text-white font-sans selection:bg-teal-500/30 selection:text-teal-900 dark:selection:text-white flex flex-col font-inter">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        {/* Decorative Gradients */}
        <div className="absolute top-0 -z-10 h-full w-full bg-slate-50 dark:bg-[#0b0c10] dark:[background:radial-gradient(125%_125%_at_50%_10%,#0b0c10_40%,#1f2937_100%)] [background:radial-gradient(125%_125%_at_50%_10%,#f8fafc_40%,#e2e8f0_100%)]"></div>

        {/* Support Badge */}
        <div data-aos="fade-down" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-sm font-medium text-slate-700 dark:text-slate-300 mb-8 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer shadow-sm">
          <IconSparkles size={16} className="text-teal-600 dark:text-slate-400" />
          Introducing Support for AI Models
        </div>

        {/* Headlines */}
        <h1 data-aos="fade-up" data-aos-delay="100" className="text-center text-5xl md:text-7xl font-bold dark:font-medium tracking-tight text-slate-900 dark:text-white max-w-4xl leading-[1.1] mb-6">
          AI-Powered Meeting Notes <br /> Summarizer & Sharer
        </h1>

        <p data-aos="fade-up" data-aos-delay="200" className="text-center text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal dark:font-light">
          Upload your meeting transcript, enter a custom prompt, <br /> and generate a structured, shareable summary in seconds.
        </p>

        {/* Buttons */}
        <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard" className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            Upload Transcript
          </Link>
          <Link href="#how-it-works" className="px-6 py-3 bg-transparent text-slate-700 dark:text-white rounded-xl font-medium hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent dark:border-transparent hover:border-slate-300">
            How It Works
          </Link>
        </div>

        {/* Hero Mockup */}
        <div data-aos="fade-up" data-aos-delay="500" className="mt-20 w-full max-w-5xl rounded-3xl p-2 bg-slate-200/80 dark:bg-slate-200/50 backdrop-blur-sm border border-slate-300 dark:border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <div className="rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 shadow-inner aspect-video flex flex-col">
            {/* Fake Window Controls */}
            <div className="bg-slate-200/80 dark:bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-slate-300 dark:border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500/80"></div>
              <div className="ml-4 flex-1 h-6 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-300 dark:border-slate-700/50 max-w-md mx-auto"></div>
            </div>
            {/* Fake App Interface */}
            <div className="flex-1 flex p-6 gap-6 h-full relative overflow-hidden">
              <div className="w-1/4 h-full flex flex-col gap-4">
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full animate-pulse blur-[1px]"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 animate-pulse blur-[1px]"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2 animate-pulse blur-[1px]"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-full animate-pulse blur-[1px]"></div>
              </div>
              <div className="flex-1 bg-white/80 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col p-6">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-1/3 mb-6"></div>
                <div className="space-y-4 flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-sm w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-sm w-full"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded-sm w-5/6"></div>
                </div>
                <div className="mt-auto pt-4 flex justify-between items-end">
                  <div className="flex gap-2">
                    <div className="w-24 h-8 bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/30 rounded-md flex items-center justify-center text-xs font-semibold">Summarized</div>
                  </div>
                  <div className="w-32 h-10 bg-teal-500 dark:bg-teal-600 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0c10]">
        <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">Trusted by innovative teams</p>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 md:gap-20 opacity-60 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="text-xl font-bold font-serif text-slate-700 dark:text-white">Acme Corp</div>
          <div className="text-xl font-bold italic text-slate-700 dark:text-white">GlobalSys</div>
          <div className="text-xl font-bold tracking-widest text-slate-700 dark:text-white">NEXUS</div>
          <div className="text-xl font-extrabold uppercase text-slate-700 dark:text-white">Vertex</div>
          <div className="text-xl font-medium text-slate-700 dark:text-white">Starlight</div>
        </div>
      </section>

      {/* How it Works / Features Grid */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto dark:bg-[#0b0c10] bg-slate-50">
        <div className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Summarize. Edit. Share.</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">The fastest way to turn lengthy transcriptions into actionable notes. Stay fully synced with your team easily.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div data-aos="fade-up" data-aos-delay="100" className="group bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconUpload size={28} stroke={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Upload Transcript</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Drop in your raw meeting transcription text or upload the file directly. We parse it instantly without storing sensitive data.
            </p>
          </div>

          {/* Feature 2 */}
          <div data-aos="fade-up" data-aos-delay="200" className="group bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50 dark:from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-14 h-14 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <IconWand size={28} stroke={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">2. Ask AI to Summarize</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
              Provide a custom instruction or let our tuned AI extract the key takeaways, action items, and decisions accurately.
            </p>
          </div>

          {/* Feature 3 */}
          <div data-aos="fade-up" data-aos-delay="300" className="group bg-white dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
            <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <IconShare size={28} stroke={1.5} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Edit & Share</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Refine the generated notes in our rich-text editor, then instantly copy to clipboard or email to all stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* Intelligent Email Summaries Section */}
      <section className="py-24 bg-white dark:bg-[#0b0c10] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Side: Mockup Grid */}
            <div data-aos="fade-right" className="relative h-[500px] w-full bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center p-8">
              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-100/50 dark:bg-teal-900/20 rounded-full blur-[80px]"></div>

              <div className="grid grid-cols-2 gap-4 relative z-10 w-full max-w-sm">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                    <IconNotes size={24} />
                  </div>
                  <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-transform duration-300 translate-y-8">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center">
                    <IconSparkles size={24} />
                  </div>
                  <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-transform duration-300 -translate-y-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                    <IconMail size={24} />
                  </div>
                  <div className="h-2 w-12 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-transform duration-300 translate-y-4">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center">
                    <IconCheck size={24} />
                  </div>
                  <div className="h-2 w-16 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right Side: Copy */}
            <div data-aos="fade-left" className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-500/20">
                <IconMail size={16} /> Workflow Automation
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-[1.1]">AI-Powered Email Summaries</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Generate intelligent meeting summaries and share them instantly via email with professional formatting. Keep your team in the loop without spending hours writing minutes.
              </p>
              <ul className="space-y-4 mb-10 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <IconCheck size={14} stroke={3} />
                  </div>
                  <span>Action item extraction and assignee highlighting.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <IconCheck size={14} stroke={3} />
                  </div>
                  <span>Structured Markdown or HTML email templates.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <IconCheck size={14} stroke={3} />
                  </div>
                  <span>Seamless clipboard copying with one click.</span>
                </li>
              </ul>

              <Link href="/" className="group flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors shadow-sm">
                Try Email Summary
                <IconArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-900 dark:bg-[#0b0c10] text-white flex flex-col items-center justify-center text-center px-4 border-t border-transparent dark:border-slate-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500 via-slate-900 dark:via-[#0b0c10] to-slate-900 dark:to-[#0b0c10]"></div>
        <div data-aos="zoom-in" className="relative z-10 max-w-3xl flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to upgrade your meetings?</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of professionals who save hours every week by automating their meeting notes with MeetBrief.
          </p>
          <Link href="/dashboard" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 text-lg">
            Start Summarizing for Free
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-950 dark:bg-[#0b0c10] py-10 text-slate-400 dark:text-slate-500 text-sm border-t border-slate-800 dark:border-slate-900 text-center relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-white text-lg">
            <div className="bg-white text-black p-1 rounded-full"><IconNotes size={16} stroke={2.5} /></div>
            MeetBrief
          </div>
          <div>&copy; {new Date().getFullYear()} MeetBrief Inc. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;