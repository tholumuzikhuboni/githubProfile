import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Chrome, Trophy, Activity, BookOpen, Code, Star, GitFork, Users, Home, Book, Layout } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Home className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-lg font-semibold text-gray-1000">Tholumuzi Khuboni</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/tholumuzikhuboni" 
               className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all transform hover:scale-105">
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-8">
            <a href="https://github.com/tholumuzikhuboni" 
               className="text-gray-600 hover:text-gray-900 transform hover:scale-110 transition-all">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/tholumuzikhuboni" 
               className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all">
              <Linkedin size={24} />
            </a>
            <a href="mailto:khuboni@tholumuzi.co.za" 
               className="text-gray-600 hover:text-red-600 transform hover:scale-110 transition-all">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-600 text-sm">© 2024 Tholumuzi Khuboni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [githubStats, setGithubStats] = useState({
    followers: 0,
    stars: 0,
    forks: 0,
    repos: 0
  });

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Fetch GitHub stats
    fetch('https://api.github.com/users/tholumuzikhuboni')
      .then(res => res.json())
      .then(data => {
        setGithubStats(prev => ({
          ...prev,
          followers: data.followers,
          repos: data.public_repos
        }));
      });

    // Fetch repositories
    fetch('https://api.github.com/users/tholumuzikhuboni/repos?per_page=100&sort=updated')
      .then(res => res.json())
      .then(data => {
        setRepositories(data);
        // Calculate total stars and forks
        const stats = data.reduce((acc, repo) => ({
          stars: acc.stars + repo.stargazers_count,
          forks: acc.forks + repo.forks_count
        }), { stars: 0, forks: 0 });
        
        setGithubStats(prev => ({
          ...prev,
          stars: stats.stars,
          forks: stats.forks
        }));
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header Card */}
          <div id="about" className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src="https://avatars.githubusercontent.com/tholumuzikhuboni" 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-indigo-100 shadow-md"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tholumuzi Khuboni</h1>
                <p className="text-lg text-gray-600 mb-4">Passionate Front-End Developer</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a href="https://linkedin.com/in/tholumuzikhuboni" 
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://portfolio.tholumuzi.co.za" 
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                    <Chrome size={18} />
                    <span>Portfolio</span>
                  </a>
                  <a href="mailto:khuboni@tholumuzi.co.za" 
                     className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                    <Mail size={18} />
                    <span>Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Followers</div>
                  <div className="text-2xl font-bold text-gray-900">{githubStats.followers}</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Total Stars</div>
                  <div className="text-2xl font-bold text-gray-900">{githubStats.stars}</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-4">
                <GitFork className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Forks</div>
                  <div className="text-2xl font-bold text-gray-900">{githubStats.forks}</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-105 transition-all">
              <div className="flex items-center gap-4">
                <Code className="w-8 h-8 text-purple-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600">Repositories</div>
                  <div className="text-2xl font-bold text-gray-900">{githubStats.repos}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div id="stats" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transform hover:scale-[1.02] transition-all">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Github className="text-gray-700" />
                GitHub Stats
              </h2>
              <img 
                src="https://github-readme-stats.vercel.app/api?username=tholumuzikhuboni&show_icons=true&theme=transparent&hide_border=true&count_private=true&bg_color=ffffff" 
                alt="GitHub Stats"
                className="w-full"
              />
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transform hover:scale-[1.02] transition-all">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="text-gray-700" />
                Contribution Streak
              </h2>
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=tholumuzikhuboni&theme=transparent&hide_border=true&background=ffffff" 
                alt="GitHub Streak"
                className="w-full"
              />
            </div>
          </div>

          {/* Tech Stack Card */}
          <div id="tech" className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 transform hover:scale-[1.02] transition-all">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="text-gray-700" />
              Tech Stack
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
              <img src="https://skillicons.dev/icons?i=html" alt="HTML" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=git" alt="Git" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=css" alt="CSS" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=js" alt="JavaScript" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=react" alt="React" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=firebase" alt="Firebase" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind CSS" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=gcp" alt="Google Cloud" className="w-16 h-16 transform hover:scale-110 transition-all" />
              <img src="https://skillicons.dev/icons?i=aws" alt="AWS" className="w-16 h-16 transform hover:scale-110 transition-all" />
            </div>
          </div>

          {/* All Projects */}
          <div id="projects" className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Layout className="text-gray-700" />
              All Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repositories.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transform hover:scale-[1.02] transition-all"
                >
                  <img 
                    src={`https://github-readme-stats.vercel.app/api/pin/?username=tholumuzikhuboni&repo=${repo.name}&theme=transparent&hide_border=true&bg_color=ffffff`}
                    alt={repo.name}
                    className="w-full"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contributions Graph */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 transform hover:scale-[1.02] transition-all">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="text-gray-700" />
              Contribution Graph
            </h2>
            <img 
              src="https://github-readme-activity-graph.vercel.app/graph?username=tholumuzikhuboni&theme=minimal&hide_border=true&bg_color=ffffff" 
              alt="Contribution Graph"
              className="w-full"
            />
          </div>

          {/* GitHub Trophies */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 transform hover:scale-[1.02] transition-all">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="text-gray-700" />
              GitHub Achievements
            </h2>
            <img 
              src="https://github-profile-trophy.vercel.app/?username=tholumuzikhuboni&theme=flat&no-frame=true&row=1&column=6&margin-w=15" 
              alt="GitHub Trophies"
              className="w-full"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
