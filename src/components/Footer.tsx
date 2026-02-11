export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative z-10 mt-auto border-t border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-amber-500 mb-2">Viking Rise Heroes Database</h3>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            A fan-made resource for Viking Rise players. Browse heroes, skills, talents, and build your perfect team composition.
          </p>
        </div>

        {/* Legal Disclaimers */}
        <div className="border-t border-slate-800 pt-6 space-y-4 text-center">
          {/* Copyright & Trademark Notice */}
          <div className="text-xs text-slate-500 max-w-4xl mx-auto space-y-2">
            <p>
              <strong className="text-slate-400">Disclaimer:</strong> This is an unofficial fan-made website and is not affiliated with, endorsed, sponsored, or specifically approved by IGG.COM. 
              Viking Rise is a trademark of IGG.COM. All game content, images, characters, names, and related materials are the property of IGG.COM and are used here under fair use for informational and educational purposes only.
            </p>
            <p>
              This website is a non-commercial, community-driven project created by fans for fans. No copyright or trademark infringement is intended. 
              All rights to Viking Rise and its content belong to their respective owners at IGG.COM.
            </p>
          </div>

          {/* Non-Profit Statement */}
          <div className="text-xs text-slate-600">
            <p>
              This is a <strong className="text-slate-500">non-profit hobby project</strong>. No revenue is generated from this website. 
              Created purely for the benefit of the Viking Rise community.
            </p>
          </div>

          {/* Copyright Line */}
          <div className="text-xs text-slate-600 pt-2">
            <p>
              Viking Rise &copy; {currentYear} IGG.COM. All Rights Reserved.
            </p>
            <p className="mt-1">
              Fan site maintained independently. For official information, visit{' '}
              <a 
                href="https://www.igg.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-amber-500/70 hover:text-amber-500 transition-colors"
              >
                igg.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
