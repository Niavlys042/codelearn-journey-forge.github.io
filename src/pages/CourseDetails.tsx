
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Code, Play, CheckCircle, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

// Types pour les données du cours
interface Module {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  sections: {
    id: number;
    title: string;
    type: "video" | "exercise" | "quiz";
    duration: string;
    completed: boolean;
  }[];
}

interface CourseData {
  id: number;
  title: string;
  description: string;
  language: string;
  level: string;
  duration: string;
  modules: number;
  rating: number;
  reviews: number;
  image: string;
  instructor: string;
  learningObjectives: string[];
  courseModules: Module[];
  progress: number;
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeModule, setActiveModule] = useState<number>(0);

  // Simuler le chargement des données du cours
  useEffect(() => {
    setLoading(true);

    // Données statiques pour chaque cours basé sur l'ID
    const fetchCourseData = () => {
      // Ceci serait normalement une requête API
      const courseData: Record<string, CourseData> = {
        "1": {
          id: 1,
          title: "Python pour les Débutants",
          description: "Apprenez les bases de Python, un langage de programmation polyvalent et facile à apprendre.",
          language: "Python",
          level: "Débutant",
          duration: "10 heures",
          modules: 8,
          rating: 4.8,
          reviews: 245,
          image: "https://placehold.co/400x225/3f87f5/FFFFFF?text=Python",
          instructor: "Dr. Sarah Martinez",
          learningObjectives: [
            "Comprendre les concepts fondamentaux de Python",
            "Créer des scripts Python simples",
            "Manipuler des données avec Python",
            "Développer des applications en ligne de commande",
            "Automatiser des tâches répétitives"
          ],
          courseModules: [
            {
              id: 1,
              title: "Introduction à Python",
              duration: "1h30",
              completed: true,
              sections: [
                { id: 101, title: "Qu'est-ce que Python?", type: "video", duration: "15min", completed: true },
                { id: 102, title: "Installation de Python", type: "video", duration: "20min", completed: true },
                { id: 103, title: "Votre premier programme", type: "exercise", duration: "25min", completed: true },
                { id: 104, title: "Quiz d'introduction", type: "quiz", duration: "15min", completed: true }
              ]
            },
            {
              id: 2,
              title: "Variables et Types de données",
              duration: "2h",
              completed: true,
              sections: [
                { id: 201, title: "Variables et affectations", type: "video", duration: "20min", completed: true },
                { id: 202, title: "Types de données numériques", type: "video", duration: "25min", completed: true },
                { id: 203, title: "Chaînes de caractères", type: "video", duration: "20min", completed: true },
                { id: 204, title: "Exercices sur les types de données", type: "exercise", duration: "30min", completed: true },
                { id: 205, title: "Quiz sur les variables", type: "quiz", duration: "15min", completed: true }
              ]
            },
            {
              id: 3,
              title: "Structures conditionnelles",
              duration: "1h45",
              completed: false,
              sections: [
                { id: 301, title: "Instructions if-else", type: "video", duration: "25min", completed: false },
                { id: 302, title: "Opérateurs logiques", type: "video", duration: "20min", completed: false },
                { id: 303, title: "Pratique des conditions", type: "exercise", duration: "40min", completed: false },
                { id: 304, title: "Quiz sur les conditionnelles", type: "quiz", duration: "15min", completed: false }
              ]
            },
            {
              id: 4,
              title: "Boucles et Itérations",
              duration: "2h15",
              completed: false,
              sections: [
                { id: 401, title: "Boucles for", type: "video", duration: "25min", completed: false },
                { id: 402, title: "Boucles while", type: "video", duration: "20min", completed: false },
                { id: 403, title: "Contrôle de boucle", type: "video", duration: "15min", completed: false },
                { id: 404, title: "Exercices pratiques", type: "exercise", duration: "55min", completed: false },
                { id: 405, title: "Quiz sur les boucles", type: "quiz", duration: "15min", completed: false }
              ]
            }
          ],
          progress: 40
        },
        "2": {
          id: 2,
          title: "JavaScript Moderne et ES6+",
          description: "Maîtrisez les fonctionnalités modernes de JavaScript pour développer des applications web interactives.",
          language: "JavaScript",
          level: "Intermédiaire",
          duration: "15 heures",
          modules: 12,
          rating: 4.9,
          reviews: 187,
          image: "https://placehold.co/400x225/f5d03f/000000?text=JavaScript",
          instructor: "Prof. Jean Dubois",
          learningObjectives: [
            "Comprendre les nouvelles fonctionnalités d'ES6+",
            "Maîtriser les concepts avancés de JavaScript",
            "Utiliser les Promises et async/await",
            "Travailler avec les modules JavaScript",
            "Implémenter des patterns modernes"
          ],
          courseModules: [
            {
              id: 1,
              title: "Introduction à JavaScript moderne",
              duration: "1h45",
              completed: true,
              sections: [
                { id: 101, title: "L'évolution de JavaScript", type: "video", duration: "20min", completed: true },
                { id: 102, title: "Outils modernes", type: "video", duration: "25min", completed: true },
                { id: 103, title: "Configuration de l'environnement", type: "exercise", duration: "40min", completed: true },
                { id: 104, title: "Quiz d'introduction", type: "quiz", duration: "15min", completed: true }
              ]
            },
            {
              id: 2,
              title: "ES6 Fondamentaux",
              duration: "2h30",
              completed: true,
              sections: [
                { id: 201, title: "Let et Const", type: "video", duration: "15min", completed: true },
                { id: 202, title: "Arrow Functions", type: "video", duration: "20min", completed: true },
                { id: 203, title: "Template Literals", type: "video", duration: "15min", completed: true },
                { id: 204, title: "Default Parameters", type: "video", duration: "15min", completed: true },
                { id: 205, title: "Exercices pratiques", type: "exercise", duration: "55min", completed: true },
                { id: 206, title: "Quiz ES6 Fondamentaux", type: "quiz", duration: "20min", completed: true }
              ]
            },
            {
              id: 3,
              title: "Structures de données modernes",
              duration: "2h15",
              completed: false,
              sections: [
                { id: 301, title: "Maps et Sets", type: "video", duration: "25min", completed: false },
                { id: 302, title: "Destructuration", type: "video", duration: "30min", completed: false },
                { id: 303, title: "Spread et Rest", type: "video", duration: "20min", completed: false },
                { id: 304, title: "Exercices pratiques", type: "exercise", duration: "45min", completed: false },
                { id: 305, title: "Quiz sur les structures", type: "quiz", duration: "15min", completed: false }
              ]
            },
            {
              id: 4,
              title: "Programmation asynchrone",
              duration: "3h",
              completed: false,
              sections: [
                { id: 401, title: "Callbacks et leurs limites", type: "video", duration: "20min", completed: false },
                { id: 402, title: "Promises en détail", type: "video", duration: "40min", completed: false },
                { id: 403, title: "Async/Await", type: "video", duration: "35min", completed: false },
                { id: 404, title: "Fetch API", type: "video", duration: "25min", completed: false },
                { id: 405, title: "Exercices asynchrones", type: "exercise", duration: "45min", completed: false },
                { id: 406, title: "Quiz final", type: "quiz", duration: "15min", completed: false }
              ]
            }
          ],
          progress: 30
        },
        "3": {
          id: 3,
          title: "Java pour le Développement d'Applications",
          description: "Créez des applications robustes et évolutives avec Java, un langage orienté objet puissant.",
          language: "Java",
          level: "Intermédiaire",
          duration: "18 heures",
          modules: 14,
          rating: 4.7,
          reviews: 156,
          image: "https://placehold.co/400x225/f53f3f/FFFFFF?text=Java",
          instructor: "Dr. Michael Chen",
          learningObjectives: [
            "Maîtriser les concepts de la programmation orientée objet",
            "Développer des applications Java avec une architecture MVC",
            "Utiliser les collections et les génériques",
            "Gérer les exceptions et déboguer efficacement",
            "Créer des interfaces utilisateur avec JavaFX"
          ],
          courseModules: [
            {
              id: 1,
              title: "Les fondamentaux de Java",
              duration: "2h",
              completed: true,
              sections: [
                { id: 101, title: "Introduction à la JVM", type: "video", duration: "20min", completed: true },
                { id: 102, title: "Types de données et variables", type: "video", duration: "25min", completed: true },
                { id: 103, title: "Structures de contrôle", type: "video", duration: "20min", completed: true },
                { id: 104, title: "Exercices pratiques", type: "exercise", duration: "40min", completed: true },
                { id: 105, title: "Quiz fondamentaux", type: "quiz", duration: "15min", completed: true }
              ]
            },
            {
              id: 2,
              title: "Programmation Orientée Objet",
              duration: "3h15",
              completed: false,
              sections: [
                { id: 201, title: "Classes et objets", type: "video", duration: "30min", completed: false },
                { id: 202, title: "Héritage et polymorphisme", type: "video", duration: "35min", completed: false },
                { id: 203, title: "Encapsulation", type: "video", duration: "25min", completed: false },
                { id: 204, title: "Interfaces et classes abstraites", type: "video", duration: "30min", completed: false },
                { id: 205, title: "Exercices pratiques", type: "exercise", duration: "55min", completed: false },
                { id: 206, title: "Quiz POO", type: "quiz", duration: "20min", completed: false }
              ]
            }
          ],
          progress: 22
        },
        "4": {
          id: 4,
          title: "C++ Avancé et Programmation Système",
          description: "Approfondissez vos connaissances en C++ pour développer des logiciels système performants.",
          language: "C++",
          level: "Avancé",
          duration: "22 heures",
          modules: 16,
          rating: 4.9,
          reviews: 98,
          image: "https://placehold.co/400x225/3fa1f5/FFFFFF?text=C++",
          instructor: "Prof. Alina Ivanova",
          learningObjectives: [
            "Maîtriser les fonctionnalités avancées de C++",
            "Optimiser les performances des applications",
            "Comprendre la gestion de la mémoire",
            "Implémenter des structures de données complexes",
            "Développer des applications multi-threads"
          ],
          courseModules: [
            {
              id: 1,
              title: "C++ Moderne (C++11 et au-delà)",
              duration: "3h",
              completed: false,
              sections: [
                { id: 101, title: "Smart Pointers", type: "video", duration: "30min", completed: false },
                { id: 102, title: "Move Semantics", type: "video", duration: "35min", completed: false },
                { id: 103, title: "Lambda Expressions", type: "video", duration: "25min", completed: false },
                { id: 104, title: "Exercices pratiques", type: "exercise", duration: "75min", completed: false },
                { id: 105, title: "Quiz C++ moderne", type: "quiz", duration: "15min", completed: false }
              ]
            }
          ],
          progress: 0
        },
        "5": {
          id: 5,
          title: "PHP et MySQL pour le Web",
          description: "Développez des sites web dynamiques avec PHP et MySQL, le duo incontournable pour le web.",
          language: "PHP",
          level: "Débutant",
          duration: "12 heures",
          modules: 10,
          rating: 4.6,
          reviews: 134,
          image: "https://placehold.co/400x225/7b3ff5/FFFFFF?text=PHP",
          instructor: "Maria Rodriguez",
          learningObjectives: [
            "Créer des pages web dynamiques avec PHP",
            "Maîtriser les opérations CRUD avec MySQL",
            "Développer un système d'authentification",
            "Gérer les sessions et les cookies",
            "Sécuriser les applications web PHP"
          ],
          courseModules: [
            {
              id: 1,
              title: "Introduction à PHP",
              duration: "2h",
              completed: false,
              sections: [
                { id: 101, title: "Configuration de l'environnement", type: "video", duration: "25min", completed: false },
                { id: 102, title: "Syntaxe de base", type: "video", duration: "30min", completed: false },
                { id: 103, title: "Variables et types", type: "video", duration: "20min", completed: false },
                { id: 104, title: "Exercices pratiques", type: "exercise", duration: "35min", completed: false },
                { id: 105, title: "Quiz d'introduction", type: "quiz", duration: "10min", completed: false }
              ]
            }
          ],
          progress: 0
        },
        "6": {
          id: 6,
          title: "Développement d'API avec Node.js",
          description: "Créez des API RESTful performantes avec Node.js et Express pour vos applications web.",
          language: "JavaScript",
          level: "Intermédiaire",
          duration: "14 heures",
          modules: 11,
          rating: 4.7,
          reviews: 173,
          image: "https://placehold.co/400x225/3ff58e/000000?text=Node.js",
          instructor: "Thomas Weber",
          learningObjectives: [
            "Comprendre l'architecture des API REST",
            "Développer des API avec Express.js",
            "Implémenter l'authentification JWT",
            "Connecter une API à MongoDB",
            "Tester et documenter votre API"
          ],
          courseModules: [
            {
              id: 1,
              title: "Introduction à Node.js",
              duration: "2h15",
              completed: false,
              sections: [
                { id: 101, title: "Qu'est-ce que Node.js?", type: "video", duration: "20min", completed: false },
                { id: 102, title: "Installation et configuration", type: "video", duration: "25min", completed: false },
                { id: 103, title: "Modules et npm", type: "video", duration: "30min", completed: false },
                { id: 104, title: "Exercices de démarrage", type: "exercise", duration: "45min", completed: false },
                { id: 105, title: "Quiz d'introduction", type: "quiz", duration: "15min", completed: false }
              ]
            }
          ],
          progress: 0
        }
      };

      if (courseId && courseData[courseId]) {
        setCourse(courseData[courseId]);
      } else {
        toast({
          title: "Erreur",
          description: "Cours non trouvé",
          variant: "destructive",
        });
        navigate("/courses");
      }
      
      setLoading(false);
    };

    fetchCourseData();
  }, [courseId, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
        <Button onClick={() => navigate("/courses")}>Retourner aux cours</Button>
      </div>
    );
  }

  const handleStartLesson = (moduleId: number, sectionId: number) => {
    toast({
      title: "Leçon démarrée",
      description: "Vous avez commencé une nouvelle leçon!",
    });
    // Ici, vous pourriez rediriger vers la page de la leçon spécifique
    // navigate(`/courses/${courseId}/modules/${moduleId}/sections/${sectionId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header avec les informations du cours */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Button 
              variant="outline" 
              className="mb-6 border-white text-white hover:bg-white/20"
              onClick={() => navigate("/courses")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux cours
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-primary/80">{course.language}</Badge>
                  <Badge variant="outline" className="border-white text-white">
                    {course.level}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold">{course.title}</h1>
                
                <p className="text-lg">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{course.modules} modules</span>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <div className="mr-4 font-semibold text-xl">
                    {course.rating}
                    <span className="text-yellow-300">★</span>
                  </div>
                  <span className="text-sm">({course.reviews} avis)</span>
                </div>

                <div>
                  <p className="font-medium">Instructeur: {course.instructor}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Progression</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal du cours */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="content">Contenu du cours</TabsTrigger>
              <TabsTrigger value="objectives">Objectifs d'apprentissage</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Liste des modules */}
                <div className="md:col-span-1">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg mb-4">Modules du cours</h3>
                    {course.courseModules.map((module, index) => (
                      <button
                        key={module.id}
                        onClick={() => setActiveModule(index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                          activeModule === index 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-secondary"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{module.title}</span>
                          {module.completed && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="text-sm mt-1 flex justify-between">
                          <span>{module.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contenu du module actif */}
                <div className="md:col-span-3">
                  <Card>
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold">{course.courseModules[activeModule].title}</h2>
                          <p className="text-muted-foreground">
                            {course.courseModules[activeModule].duration} • 
                            {course.courseModules[activeModule].sections.length} sections
                          </p>
                        </div>
                        <Badge variant={course.courseModules[activeModule].completed ? "default" : "outline"}>
                          {course.courseModules[activeModule].completed ? "Terminé" : "Non terminé"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {course.courseModules[activeModule].sections.map((section) => (
                          <li key={section.id} className="p-4 hover:bg-secondary/50">
                            <div className="flex justify-between items-center">
                              <div className="flex items-start space-x-4">
                                <div className={`p-2 rounded-full ${
                                  section.type === 'video' ? 'bg-blue-100' : 
                                  section.type === 'exercise' ? 'bg-green-100' : 'bg-amber-100'
                                }`}>
                                  {section.type === 'video' ? (
                                    <Play className="h-5 w-5" />
                                  ) : section.type === 'exercise' ? (
                                    <Code className="h-5 w-5" />
                                  ) : (
                                    <BookOpen className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium">{section.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {section.type === 'video' ? 'Vidéo' : 
                                     section.type === 'exercise' ? 'Exercice pratique' : 'Quiz'} • 
                                    {section.duration}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                {section.completed ? (
                                  <Badge className="bg-green-500 hover:bg-green-600">Terminé</Badge>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleStartLesson(course.courseModules[activeModule].id, section.id)}
                                  >
                                    Commencer
                                  </Button>
                                )}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="objectives">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Objectifs d'apprentissage</h3>
                  <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;
