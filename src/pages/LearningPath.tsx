
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Clock, BookOpen, CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

// Types pour les données du parcours
interface PathCourse {
  id: number;
  title: string;
  description: string;
  duration: string;
  image: string;
  level: string;
  progress: number;
  completed: boolean;
}

interface LearningPathData {
  id: string;
  title: string;
  description: string;
  courses: number;
  duration: string;
  image: string;
  icon: string;
  skillLevel: string;
  overview: string;
  benefits: string[];
  coursesData: PathCourse[];
  totalProgress: number;
}

const LearningPath = () => {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [path, setPath] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    // Données statiques des parcours d'apprentissage
    const fetchPathData = () => {
      const pathsData: Record<string, LearningPathData> = {
        "web-frontend": {
          id: "web-frontend",
          title: "Développeur Web Front-end",
          description: "Maîtrisez HTML, CSS et JavaScript pour créer des interfaces web interactives.",
          courses: 5,
          duration: "40 heures",
          image: "https://placehold.co/800x400/3fa1f5/FFFFFF?text=Front-end+Web+Development",
          icon: "code",
          skillLevel: "Débutant à Intermédiaire",
          overview: "Ce parcours d'apprentissage complet vous formera aux fondamentaux du développement web front-end. Vous maîtriserez HTML5, CSS3 et JavaScript moderne pour créer des sites web réactifs et des interfaces utilisateur attrayantes. Vous apprendrez également à utiliser des frameworks populaires comme React pour développer des applications web dynamiques et performantes.",
          benefits: [
            "Apprenez à créer des sites web responsive avec HTML5 et CSS3",
            "Maîtrisez JavaScript moderne et ses frameworks populaires",
            "Développez des compétences en UI/UX design",
            "Construisez un portfolio professionnel de projets web",
            "Préparez-vous aux entretiens techniques front-end"
          ],
          coursesData: [
            {
              id: 1,
              title: "Fondamentaux du HTML5 et CSS3",
              description: "Apprenez les bases pour créer la structure et le style de sites web modernes.",
              duration: "8 heures",
              image: "https://placehold.co/400x225/6366f1/FFFFFF?text=HTML+%26+CSS",
              level: "Débutant",
              progress: 100,
              completed: true
            },
            {
              id: 2,
              title: "JavaScript Moderne et ES6+",
              description: "Maîtrisez les fonctionnalités modernes de JavaScript pour développer des applications web interactives.",
              duration: "15 heures",
              image: "https://placehold.co/400x225/f5d03f/000000?text=JavaScript",
              level: "Intermédiaire",
              progress: 60,
              completed: false
            },
            {
              id: 3,
              title: "Responsive Web Design",
              description: "Créez des sites qui s'adaptent parfaitement à tous les appareils.",
              duration: "6 heures",
              image: "https://placehold.co/400x225/10b981/FFFFFF?text=Responsive",
              level: "Intermédiaire",
              progress: 40,
              completed: false
            },
            {
              id: 4,
              title: "Introduction à React",
              description: "Développez des interfaces utilisateur dynamiques avec la bibliothèque React.",
              duration: "12 heures",
              image: "https://placehold.co/400x225/0ea5e9/FFFFFF?text=React",
              level: "Intermédiaire",
              progress: 0,
              completed: false
            },
            {
              id: 5,
              title: "Projet final: Portfolio Web",
              description: "Appliquez toutes vos connaissances pour créer un portfolio web professionnel.",
              duration: "8 heures",
              image: "https://placehold.co/400x225/8b5cf6/FFFFFF?text=Portfolio",
              level: "Intermédiaire",
              progress: 0,
              completed: false
            }
          ],
          totalProgress: 40
        },
        "data-science": {
          id: "data-science",
          title: "Data Science avec Python",
          description: "Apprenez à analyser et visualiser des données avec Python, Pandas et Matplotlib.",
          courses: 4,
          duration: "35 heures",
          image: "https://placehold.co/800x400/10b981/FFFFFF?text=Data+Science",
          icon: "data",
          skillLevel: "Intermédiaire",
          overview: "Ce parcours complet de Data Science vous apprendra à utiliser Python et ses bibliothèques populaires pour analyser des données, créer des visualisations percutantes et développer des modèles de machine learning. Vous passerez de la manipulation de bases de données à la construction de modèles prédictifs, en acquérant des compétences très recherchées sur le marché du travail.",
          benefits: [
            "Maîtrisez Python pour l'analyse de données scientifiques",
            "Apprenez à utiliser Pandas, NumPy et Matplotlib efficacement",
            "Visualisez des données complexes de manière claire et informative",
            "Développez des modèles de machine learning avec scikit-learn",
            "Travaillez sur des projets concrets avec des données réelles"
          ],
          coursesData: [
            {
              id: 1,
              title: "Python pour la Data Science",
              description: "Fondamentaux de Python orientés vers l'analyse de données.",
              duration: "10 heures",
              image: "https://placehold.co/400x225/3f87f5/FFFFFF?text=Python",
              level: "Débutant",
              progress: 70,
              completed: false
            },
            {
              id: 2,
              title: "Analyse de données avec Pandas",
              description: "Manipulez et analysez des données structurées avec Pandas.",
              duration: "8 heures",
              image: "https://placehold.co/400x225/f59e0b/FFFFFF?text=Pandas",
              level: "Intermédiaire",
              progress: 30,
              completed: false
            },
            {
              id: 3,
              title: "Visualisation de données avec Matplotlib et Seaborn",
              description: "Créez des visualisations informatives et attrayantes.",
              duration: "7 heures",
              image: "https://placehold.co/400x225/8b5cf6/FFFFFF?text=Dataviz",
              level: "Intermédiaire",
              progress: 10,
              completed: false
            },
            {
              id: 4,
              title: "Introduction au Machine Learning",
              description: "Apprenez les bases du machine learning avec scikit-learn.",
              duration: "10 heures",
              image: "https://placehold.co/400x225/ec4899/FFFFFF?text=ML",
              level: "Avancé",
              progress: 0,
              completed: false
            }
          ],
          totalProgress: 28
        },
        "mobile-dev": {
          id: "mobile-dev",
          title: "Développement Mobile",
          description: "Créez des applications mobiles natives avec Swift pour iOS et Java pour Android.",
          courses: 6,
          duration: "50 heures",
          image: "https://placehold.co/800x400/8b5cf6/FFFFFF?text=Mobile+Development",
          icon: "mobile",
          skillLevel: "Intermédiaire à Avancé",
          overview: "Ce parcours complet vous formera au développement d'applications mobiles pour les deux principales plateformes: iOS et Android. Vous apprendrez à concevoir des interfaces utilisateur intuitives, à gérer les données localement et à distance, et à publier vos applications sur les stores. À la fin de ce parcours, vous serez capable de développer des applications mobiles professionnelles et performantes.",
          benefits: [
            "Maîtrisez les langages natifs: Swift pour iOS et Kotlin pour Android",
            "Développez des interfaces utilisateur modernes et réactives",
            "Intégrez des API externes et des services cloud dans vos applications",
            "Apprenez les meilleures pratiques en matière de sécurité mobile",
            "Créez et publiez des applications complètes sur les stores"
          ],
          coursesData: [
            {
              id: 1,
              title: "Introduction au développement mobile",
              description: "Comprendre les spécificités des plateformes mobiles.",
              duration: "5 heures",
              image: "https://placehold.co/400x225/10b981/FFFFFF?text=Mobile+Intro",
              level: "Débutant",
              progress: 25,
              completed: false
            },
            {
              id: 2,
              title: "Swift pour iOS: Les fondamentaux",
              description: "Apprenez les bases du langage Swift et de l'écosystème iOS.",
              duration: "12 heures",
              image: "https://placehold.co/400x225/e11d48/FFFFFF?text=Swift",
              level: "Intermédiaire",
              progress: 0,
              completed: false
            },
            {
              id: 3,
              title: "Kotlin pour Android: Les fondamentaux",
              description: "Maîtrisez Kotlin et les composants Android essentiels.",
              duration: "12 heures",
              image: "https://placehold.co/400x225/16a34a/FFFFFF?text=Kotlin",
              level: "Intermédiaire",
              progress: 0,
              completed: false
            },
            {
              id: 4,
              title: "Architecture d'applications mobiles",
              description: "Concevez des applications évolutives et maintenables.",
              duration: "8 heures",
              image: "https://placehold.co/400x225/6366f1/FFFFFF?text=Architecture",
              level: "Avancé",
              progress: 0,
              completed: false
            },
            {
              id: 5,
              title: "Projet iOS: Application de liste de tâches",
              description: "Créez une application iOS complète de gestion de tâches.",
              duration: "6 heures",
              image: "https://placehold.co/400x225/e11d48/FFFFFF?text=iOS+Project",
              level: "Avancé",
              progress: 0,
              completed: false
            },
            {
              id: 6,
              title: "Projet Android: Application de liste de tâches",
              description: "Créez une application Android complète de gestion de tâches.",
              duration: "7 heures",
              image: "https://placehold.co/400x225/16a34a/FFFFFF?text=Android+Project",
              level: "Avancé",
              progress: 0,
              completed: false
            }
          ],
          totalProgress: 5
        }
      };
      
      if (pathId && pathsData[pathId]) {
        setPath(pathsData[pathId]);
      } else {
        toast({
          title: "Erreur",
          description: "Parcours d'apprentissage non trouvé",
          variant: "destructive",
        });
        navigate("/courses");
      }
      
      setLoading(false);
    };

    fetchPathData();
  }, [pathId, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Parcours non trouvé</h1>
        <Button onClick={() => navigate("/courses")}>Retourner aux cours</Button>
      </div>
    );
  }

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header avec les informations du parcours */}
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
                    src={path.image} 
                    alt={path.title} 
                    className="w-full aspect-video object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <Badge className="bg-primary/80">Parcours d'apprentissage</Badge>
                
                <h1 className="text-3xl font-bold">{path.title}</h1>
                
                <p className="text-lg">{path.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{path.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>{path.courses} cours</span>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Niveau: {path.skillLevel}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Progression totale</span>
                    <span>{path.totalProgress}%</span>
                  </div>
                  <Progress value={path.totalProgress} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal du parcours */}
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {/* Vue d'ensemble */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Vue d'ensemble</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-base leading-7">{path.overview}</p>
                </CardContent>
              </Card>
            </section>

            {/* Ce que vous allez apprendre */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Ce que vous allez apprendre</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {path.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Cours inclus */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Cours inclus dans ce parcours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {path.coursesData.map((course) => (
                  <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={() => handleCourseClick(course.id)}>
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant={course.completed ? "default" : "outline"}>
                          {course.completed ? "Terminé" : "En cours"}
                        </Badge>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {course.level}
                        </span>
                      </div>
                      <CardTitle className="mt-2">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1 text-sm">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">
                        {course.progress > 0 ? "Continuer" : "Commencer"} le cours
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LearningPath;
