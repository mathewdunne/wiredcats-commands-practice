import { useNavigate } from 'react-router-dom';
import { Layers, Braces } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
              <div className="text-center mb-12">
                  <h1 className="text-5xl font-bold text-white mb-4">
                      WiredCats Programming Training
                  </h1>
                  <p className="text-gray-400 text-lg">
                      Choose a game to practice your skills
                  </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                  {/* Command Group Practice Game */}
                  <button
                      onClick={() => navigate("/command-group-practice")}
                      className="group bg-gray-800 hover:bg-gray-750 border-2 border-gray-700 hover:border-blue-500 rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                      <div className="flex items-center gap-4 mb-4">
                          <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                              <Layers className="text-blue-500" size={32} />
                          </div>
                          <h2 className="text-2xl font-bold text-white">
                              Command Group Practice
                          </h2>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                          Learn to organize commands into sequential and
                          parallel groups. Master the fundamentals of command
                          structure and execution flow.
                      </p>
                  </button>

                  {/* Java Class Match Predictor Game */}
                  <button
                      onClick={() =>
                          window.open(
                              "https://www.programiz.com/online-compiler/4CgVNmQdApYOY",
                              "_blank"
                          )
                      }
                      className="group bg-gray-800 hover:bg-gray-750 border-2 border-gray-700 hover:border-green-500 rounded-xl p-8 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                  >
                      <div className="flex items-center gap-4 mb-4">
                          <div className="bg-green-500/10 p-3 rounded-lg group-hover:bg-green-500/20 transition-colors">
                              <Braces className="text-green-500" size={32} />
                          </div>
                          <h2 className="text-2xl font-bold text-white">
                              Java Class/Object Practice (Match Predictor)
                          </h2>
                      </div>
                      <p className="text-gray-400 leading-relaxed">
                          Practice working with classes and objects in Java
                          using a simple match prediction example.
                      </p>
                  </button>
              </div>

              <div className="mt-12 text-center">
                  <p className="text-gray-500 text-sm">
                      Built for FRC Team 5885 the Villanova WiredCats
                  </p>
              </div>
          </div>
      </div>
  );
}
