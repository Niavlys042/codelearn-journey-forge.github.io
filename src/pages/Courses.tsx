
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Clock, Star, BarChart2, Filter, ChevronDown, Code } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const CourseLevelIndicator = ({ level }: { level: string }) => {
  const levels = ["Débutant", "Intermédiaire", "Avancé"];
  const currentIndex = levels.indexOf(level);
  
  return (
    <div className="flex items-center">
      {levels.map((_, index) => (
        <div 
          key={index}
          className={`h-2 w-5 rounded-full mx-0.5 ${index <= currentIndex ? 'bg-primary' : 'bg-primary/20'}`}
        />
      ))}
      <span className="ml-2 text-sm">{level}</span>
    </div>
  );
};

const Courses = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  
  // Liste des langages disponibles
  const availableLanguages = [
    "Python", "JavaScript", "Java", "C++", "PHP", "Ruby", "Swift", "Go", "Rust"
  ];
  
  // Liste des niveaux disponibles
  const availableLevels = ["Débutant", "Intermédiaire", "Avancé"];
  
  // Données de cours (dans un cas réel, vous récupéreriez ces données depuis votre API)
  const coursesData = [
    {
      id: 1,
      title: "Python pour les Débutants",
      description: "Apprenez les bases de Python, un langage de programmation polyvalent et facile à apprendre.",
      language: "Python",
      level: "Débutant",
      duration: "10 heures",
      modules: 8,
      rating: 4.8,
      reviews: 245,
      image: "https://placehold.co/400x225/3f87f5/FFFFFF?text=Python"
    },
    {
      id: 2,
      title: "JavaScript Moderne et ES6+",
      description: "Maîtrisez les fonctionnalités modernes de JavaScript pour développer des applications web interactives.",
      language: "JavaScript",
      level: "Intermédiaire",
      duration: "15 heures",
      modules: 12,
      rating: 4.9,
      reviews: 187,
      image: "https://placehold.co/400x225/f5d03f/000000?text=JavaScript"
    },
    {
      id: 3,
      title: "Java pour le Développement d'Applications",
      description: "Créez des applications robustes et évolutives avec Java, un langage orienté objet puissant.",
      language: "Java",
      level: "Intermédiaire",
      duration: "18 heures",
      modules: 14,
      rating: 4.7,
      reviews: 156,
      image: "https://placehold.co/400x225/f53f3f/FFFFFF?text=Java"
    },
    {
      id: 4,
      title: "C++ Avancé et Programmation Système",
      description: "Approfondissez vos connaissances en C++ pour développer des logiciels système performants.",
      language: "C++",
      level: "Avancé",
      duration: "22 heures",
      modules: 16,
      rating: 4.9,
      reviews: 98,
      image: "https://placehold.co/400x225/3fa1f5/FFFFFF?text=C++"
    },
    {
      id: 5,
      title: "PHP et MySQL pour le Web",
      description: "Développez des sites web dynamiques avec PHP et MySQL, le duo incontournable pour le web.",
      language: "PHP",
      level: "Débutant",
      duration: "12 heures",
      modules: 10,
      rating: 4.6,
      reviews: 134,
      image: "https://placehold.co/400x225/7b3ff5/FFFFFF?text=PHP"
    },
    {
      id: 6,
      title: "Développement d'API avec Node.js",
      description: "Créez des API RESTful performantes avec Node.js et Express pour vos applications web.",
      language: "JavaScript",
      level: "Intermédiaire",
      duration: "14 heures",
      modules: 11,
      rating: 4.7,
      reviews: 173,
      image: "https://placehold.co/400x225/3ff58e/000000?text=Node.js"
    }
  ];
  
  // Filtrer les cours en fonction de la recherche et des filtres
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLanguage = selectedLanguages.length === 0 || 
                            selectedLanguages.includes(course.language);
    
    const matchesLevel = selectedLevels.length === 0 || 
                         selectedLevels.includes(course.level);
    
    return matchesSearch && matchesLanguage && matchesLevel;
  });
  
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  const toggleLevel = (level: string) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter(lvl => lvl !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };
  
  const handleCourseClick = (courseId: number) => {
    // Redirection vers la page détaillée du cours
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Explorer. Apprendre. Maîtriser.
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg sm:text-xl">
                Parcourez notre catalogue de cours et développez vos compétences en programmation.
              </p>
              
              <div className="mt-8 max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-300" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Rechercher un cours, un langage..."
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white">
                        <Filter className="h-5 w-5 mr-2" />
                        Filtres
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Langages</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {availableLanguages.map(language => (
                        <DropdownMenuCheckboxItem
                          key={language}
                          checked={selectedLanguages.includes(language)}
                          onCheckedChange={() => toggleLanguage(language)}
                        >
                          {language}
                        </DropdownMenuCheckboxItem>
                      ))}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Niveau</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {availableLevels.map(level => (
                        <DropdownMenuCheckboxItem
                          key={level}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={() => toggleLevel(level)}
                        >
                          {level}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {selectedLanguages.map(language => (
                  <span key={language} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                    {language}
                    <button 
                      className="ml-2 focus:outline-none"
                      onClick={() => toggleLanguage(language)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                
                {selectedLevels.map(level => (
                  <span key={level} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                    {level}
                    <button 
                      className="ml-2 focus:outline-none"
                      onClick={() => toggleLevel(level)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Nos cours</h2>
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="popular">Populaires</TabsTrigger>
                  <TabsTrigger value="new">Nouveautés</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {filteredCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium">Aucun cours ne correspond à votre recherche</h3>
                    <p className="text-muted-foreground mt-2">Essayez avec d'autres termes ou filtres</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
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
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {course.language}
                            </span>
                            <CourseLevelIndicator level={course.level} />
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
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{course.modules} modules</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-amber-500" />
                              <span>{course.rating} ({course.reviews})</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Voir le cours
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 6)
                    .map(course => (
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
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {course.language}
                            </span>
                            <CourseLevelIndicator level={course.level} />
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
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{course.modules} modules</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-amber-500" />
                              <span>{course.rating} ({course.reviews})</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Voir le cours
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="new" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses
                    .slice(0, 3)
                    .map(course => (
                      <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md cursor-pointer relative" onClick={() => handleCourseClick(course.id)}>
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                            Nouveau
                          </span>
                        </div>
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
                            <CourseLevelIndicator level={course.level} />
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
                            <div className="flex items-center">
                              <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{course.modules} modules</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-amber-500" />
                              <span>{course.rating} ({course.reviews})</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Voir le cours
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Learning Paths Section */}
        <section className="py-12 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Parcours d'Apprentissage</h2>
              <p className="text-muted-foreground mt-2">
                Suivez un parcours structuré pour développer vos compétences de manière complète
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Développeur Web Front-end",
                  description: "Maîtrisez HTML, CSS et JavaScript pour créer des interfaces web interactives.",
                  courses: 5,
                  duration: "40 heures",
                  icon: <Code className="h-12 w-12 text-blue-500" />
                },
                {
                  title: "Data Science avec Python",
                  description: "Apprenez à analyser et visualiser des données avec Python, Pandas et Matplotlib.",
                  courses: 4,
                  duration: "35 heures",
                  icon: <Code className="h-12 w-12 text-green-500" />
                },
                {
                  title: "Développement Mobile",
                  description: "Créez des applications mobiles natives avec Swift pour iOS et Java pour Android.",
                  courses: 6,
                  duration: "50 heures",
                  icon: <Code className="h-12 w-12 text-purple-500" />
                }
              ].map((path, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {path.icon}
                    </div>
                    <CardTitle className="text-center">{path.title}</CardTitle>
                    <CardDescription className="text-center">{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{path.courses} cours</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{path.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Voir le parcours
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold">Prêt à développer vos compétences?</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Inscrivez-vous maintenant pour accéder à tous nos cours et commencer votre parcours d'apprentissage.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                S'inscrire gratuitement
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate("/pricing")}
              >
                Voir les abonnements
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
