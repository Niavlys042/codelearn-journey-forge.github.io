
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Play, Trophy, BarChart, CheckCircle, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface Course {
  id: number;
  title: string;
  description: string;
  language: string;
  level: string;
  image: string;
  progress: number;
  lastAccessed?: string;
}

interface Certificate {
  id: number;
  title: string;
  date: string;
  courseName: string;
  image: string;
}

interface Statistics {
  coursesCompleted: number;
  coursesInProgress: number;
  totalLearningTime: string;
  certificatesEarned: number;
  averageProgress: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [stats, setStats] = useState<Statistics>({
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalLearningTime: "0h",
    certificatesEarned: 0,
    averageProgress: 0
  });

  // Simulation de données utilisateur
  useEffect(() => {
    // Ceci serait remplacé par un appel API pour récupérer les données de l'utilisateur
    const loadUserData = () => {
      setIsLoading(true);

      // Données simulées des cours auxquels l'utilisateur est inscrit
      const userCourses: Course[] = [
        {
          id: 1,
          title: "Python pour les Débutants",
          description: "Apprenez les bases de Python, un langage de programmation polyvalent et facile à apprendre.",
          language: "Python",
          level: "Débutant",
          image: "https://placehold.co/400x225/3f87f5/FFFFFF?text=Python",
          progress: 40,
          lastAccessed: "2023-05-02"
        },
        {
          id: 2,
          title: "JavaScript Moderne et ES6+",
          description: "Maîtrisez les fonctionnalités modernes de JavaScript pour développer des applications web interactives.",
          language: "JavaScript",
          level: "Intermédiaire",
          image: "https://placehold.co/400x225/f5d03f/000000?text=JavaScript",
          progress: 30,
          lastAccessed: "2023-05-01"
        },
        {
          id: 3,
          title: "Java pour le Développement d'Applications",
          description: "Créez des applications robustes et évolutives avec Java, un langage orienté objet puissant.",
          language: "Java",
          level: "Intermédiaire",
          image: "https://placehold.co/400x225/f53f3f/FFFFFF?text=Java",
          progress: 22,
          lastAccessed: "2023-04-28"
        }
      ];

      // Données simulées des certificats de l'utilisateur
      const userCertificates: Certificate[] = [
        {
          id: 1,
          title: "HTML5 & CSS3 Fondamentaux",
          date: "2023-04-15",
          courseName: "Développement Web Front-end",
          image: "https://placehold.co/400x300/6366f1/FFFFFF?text=HTML+%26+CSS"
        }
      ];

      // Statistiques calculées
      const userStats: Statistics = {
        coursesCompleted: userCertificates.length,
        coursesInProgress: userCourses.length,
        totalLearningTime: "28h 45min",
        certificatesEarned: userCertificates.length,
        averageProgress: Math.round(userCourses.reduce((sum, course) => sum + course.progress, 0) / userCourses.length)
      };

      setEnrolledCourses(userCourses);
      setCertificates(userCertificates);
      setStats(userStats);
      setIsLoading(false);
    };

    // Simuler un délai de chargement
    setTimeout(loadUserData, 1000);
  }, []);

  const handleContinueCourse = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const handleViewCertificate = (certificateId: number) => {
    navigate(`/certificate/${certificateId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
          
          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cours en progression</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">{stats.coursesInProgress}</CardTitle>
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  {stats.coursesCompleted > 0 ? `+ ${stats.coursesCompleted} terminés` : "Aucun cours terminé"}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Temps d'apprentissage</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">{stats.totalLearningTime}</CardTitle>
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Cette semaine: 4h 20min
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Certificats obtenus</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">{stats.certificatesEarned}</CardTitle>
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Progressez pour en gagner plus
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Progression moyenne</CardDescription>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">{stats.averageProgress}%</CardTitle>
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={stats.averageProgress} className="h-2" />
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="courses" className="mb-8">
            <TabsList>
              <TabsTrigger value="courses">Mes cours</TabsTrigger>
              <TabsTrigger value="certificates">Certificats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium">Vous n'êtes inscrit à aucun cours</h3>
                    <p className="text-muted-foreground mt-2 mb-4">Commencez à apprendre en vous inscrivant à un cours</p>
                    <Button onClick={() => navigate("/courses")}>Explorer les cours</Button>
                  </div>
                ) : (
                  enrolledCourses.map(course => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button 
                            variant="secondary"
                            size="icon"
                            className="rounded-full"
                            onClick={() => handleContinueCourse(course.id)}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {course.language}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {course.level}
                          </span>
                        </div>
                        <CardTitle className="mt-2">{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-1 text-sm">
                              <span>Progression</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          {course.lastAccessed && (
                            <div className="text-sm text-muted-foreground">
                              Dernière activité: {new Date(course.lastAccessed).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => handleContinueCourse(course.id)}
                        >
                          Continuer
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
              
              {enrolledCourses.length > 0 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" onClick={() => navigate("/courses")}>
                    Explorer plus de cours
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="certificates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium">Aucun certificat pour le moment</h3>
                    <p className="text-muted-foreground mt-2 mb-4">
                      Terminez un cours pour obtenir votre premier certificat
                    </p>
                    <Button onClick={() => navigate("/courses")}>Explorer les cours</Button>
                  </div>
                ) : (
                  certificates.map(certificate => (
                    <Card key={certificate.id} className="overflow-hidden hover:shadow-md transition-all">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img 
                          src={certificate.image} 
                          alt={certificate.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-sm text-green-500">Certifié</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 mr-1" />
                            <span className="text-sm">4.5</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2">{certificate.title}</CardTitle>
                        <CardDescription>{certificate.courseName}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          Date d'obtention: {new Date(certificate.date).toLocaleDateString()}
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewCertificate(certificate.id)}
                        >
                          Voir
                        </Button>
                        <Button className="flex-1">Télécharger</Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Recommandations */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommandé pour vous</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 4,
                  title: "C++ Avancé et Programmation Système",
                  description: "Approfondissez vos connaissances en C++ pour développer des logiciels système performants.",
                  language: "C++",
                  level: "Avancé",
                  image: "https://placehold.co/400x225/3fa1f5/FFFFFF?text=C++",
                  rating: 4.9
                },
                {
                  id: 5,
                  title: "PHP et MySQL pour le Web",
                  description: "Développez des sites web dynamiques avec PHP et MySQL, le duo incontournable pour le web.",
                  language: "PHP",
                  level: "Débutant",
                  image: "https://placehold.co/400x225/7b3ff5/FFFFFF?text=PHP",
                  rating: 4.6
                },
                {
                  id: 6,
                  title: "Développement d'API avec Node.js",
                  description: "Créez des API RESTful performantes avec Node.js et Express pour vos applications web.",
                  language: "JavaScript",
                  level: "Intermédiaire",
                  image: "https://placehold.co/400x225/3ff58e/000000?text=Node.js",
                  rating: 4.7
                }
              ].map(course => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => handleContinueCourse(course.id)}>
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {course.language}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {course.level}
                      </span>
                    </div>
                    <CardTitle className="mt-2">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">
                      Voir le cours
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
