import ChromaGrid from './ChromaGrid'


export default function Skills() {
    const items = [
        {
          image: "src/assets/images/svg/devicon_java.svg",
          title: "java",
          subtitle: "poo",
          handle: "oriente objet",
          borderColor: "#3B82F6",
          gradient: "linear-gradient(145deg, #3B82F6, #000)",
          url: "#"
        },
        {
          image: "src/assets/images/svg/devicon_tailwindcss.svg",
          title: "tailwindcss",
          subtitle: "frame-work css",
          handle: "style",
          borderColor: "#10B981",
          gradient: "linear-gradient(180deg, #10B981, #000)",
          url: "#"
        },
        {
            image: "src/assets/images/svg/Group.svg",
            title: "react",
            subtitle: "frame-work js",
            handle: "composants",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/icomoon-free_git.svg",
            title: "git",
            subtitle: "versionner de code",
            handle: "push",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/logos_html-5.svg",
            title: "html",
            subtitle: "language de balisage",
            handle: "achitecture",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/devicon_figma.svg",
            title: "Figma",
            subtitle: "maquette",
            handle: "@design",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/mdi_github.svg",
            title: "Github",
            subtitle: "Hebergement",
            handle: "repository",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/Vector.svg",
            title: "Spring Boot",
            subtitle: "Frame-work java",
            handle: "robustre",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/vscode-icons_file-type-js-official.svg",
            title: "java script",
            subtitle: "le coeur du web",
            handle: "polyvalent",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: ""
          },
          {
            image: "src/assets/images/svg/logos_css-3.svg",
            title: "css",
            subtitle: "styliser",
            handle: "style",
            borderColor: "#10B981",
            gradient: "linear-gradient(180deg, #10B981, #000)",
            url: "https://linkedin.com/in/mikechen"
          }
        
      ];
    return (
      <section id="compétences" className="min-h-screen bg-slate-900 text-white p-20">
        <h2 className="text-4xl text-center mb-12">Compétences</h2>
        <div style={{ height: '800px', position: 'relative' }}>
  <ChromaGrid 
    items={items}
    radius={300}
    damping={0.5}
    fadeOut={0.4}
    ease="power3.out"
  />
</div>
      </section>
    );
  }