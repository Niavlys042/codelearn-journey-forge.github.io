
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { User, Book, Check, X, Plus, Edit, Trash, ShieldCheck } from "lucide-react";

// Types
type UserType = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_premium: boolean;
  is_admin: boolean;
  is_active: boolean;
  date_joined: string;
  profile_picture?: string;
  total_learning_time: number;
  courses_completed: number;
};

type CourseType = {
  id: number;
  title: string;
  description: string;
  language: string;
  level: string;
  instructor: string;
  duration: string;
  is_published: boolean;
  created_at: string;
  rating: number;
  reviews_count: number;
};

type CertificateType = {
  id: number;
  certificate_id: string;
  user: number;
  course: number;
  title: string;
  issue_date: string;
  is_valid: boolean;
};

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Vérification de l'authentification et des droits d'administrateur
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");
    
    if (!token || !userJson) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      const user = JSON.parse(userJson);
      setIsAuthenticated(true);
      
      if (!user.is_admin && !user.is_staff) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits d'administrateur nécessaires.",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }
      
      setIsAdmin(true);
    } catch (error) {
      console.error("Erreur lors de la vérification des droits:", error);
      navigate("/login");
    }
  }, [navigate]);

  // Obtenir la liste des utilisateurs
  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch("/api/users/all/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
      return response.json();
    },
    enabled: isAdmin,
  });

  // Obtenir la liste des cours
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch("/api/courses/courses/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Erreur lors de la récupération des cours");
      return response.json();
    },
    enabled: isAdmin,
  });

  // Obtenir la liste des certificats
  const { data: certificates, isLoading: certificatesLoading } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch("/api/certificates/certificates/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Erreur lors de la récupération des certificats");
      return response.json();
    },
    enabled: isAdmin,
  });

  // Mutation pour activer/désactiver un utilisateur
  const toggleUserActive = useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch(`/api/users/all/${userId}/toggle_active/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error("Erreur lors de la modification du statut de l'utilisateur");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "Succès",
        description: "Le statut de l'utilisateur a été mis à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation pour activer/désactiver le statut premium d'un utilisateur
  const toggleUserPremium = useMutation({
    mutationFn: async ({ userId }: { userId: number }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch(`/api/users/all/${userId}/toggle_premium/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error("Erreur lors de la modification du statut premium");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "Succès",
        description: "Le statut premium de l'utilisateur a été mis à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation pour publier/dépublier un cours
  const toggleCoursePublished = useMutation({
    mutationFn: async ({ courseId, isPublished }: { courseId: number, isPublished: boolean }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch(`/api/courses/courses/${courseId}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_published: isPublished }),
      });
      
      if (!response.ok) throw new Error("Erreur lors de la modification du statut du cours");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast({
        title: "Succès",
        description: "Le statut du cours a été mis à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Mutation pour valider/invalider un certificat
  const toggleCertificateValid = useMutation({
    mutationFn: async ({ certificateId, isValid }: { certificateId: number, isValid: boolean }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Non authentifié");
      
      const response = await fetch(`/api/certificates/certificates/${certificateId}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_valid: isValid }),
      });
      
      if (!response.ok) throw new Error("Erreur lors de la modification de la validité du certificat");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      toast({
        title: "Succès",
        description: "La validité du certificat a été mise à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Si l'utilisateur n'est pas authentifié ou n'est pas admin, ne pas afficher le contenu
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          <p>Vérification des droits d'accès</p>
        </div>
      </div>
    );
  }

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users?.results?.filter((user: UserType) => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrer les cours en fonction du terme de recherche
  const filteredCourses = courses?.results?.filter((course: CourseType) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrer les certificats en fonction du terme de recherche
  const filteredCertificates = certificates?.results?.filter((certificate: CertificateType) => 
    certificate.certificate_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    certificate.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Administration</h1>
              <p className="text-muted-foreground">Gérez les utilisateurs, les cours et les certificats</p>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-medium">Mode Administrateur</span>
            </div>
          </div>
          
          <div className="mb-6">
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="users">
            <TabsList className="mb-6">
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Utilisateurs</span>
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center space-x-2">
                <Book className="h-4 w-4" />
                <span>Cours</span>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>Certificats</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Utilisateurs</CardTitle>
                  <CardDescription>Liste de tous les utilisateurs enregistrés</CardDescription>
                </CardHeader>
                <CardContent>
                  {usersLoading ? (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableCaption>Liste des utilisateurs</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Nom d'utilisateur</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Nom complet</TableHead>
                          <TableHead>Premium</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers?.map((user: UserType) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                            <TableCell>
                              <Badge variant={user.is_premium ? "default" : "outline"}>
                                {user.is_premium ? "Premium" : "Standard"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.is_active ? "success" : "destructive"}>
                                {user.is_active ? "Actif" : "Inactif"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleUserActive.mutate({ userId: user.id })}
                                >
                                  {user.is_active ? (
                                    <X className="h-4 w-4" />
                                  ) : (
                                    <Check className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleUserPremium.mutate({ userId: user.id })}
                                >
                                  {user.is_premium ? "Standard" : "Premium"}
                                </Button>
                                <Sheet>
                                  <SheetTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <SheetHeader>
                                      <SheetTitle>Modifier l'utilisateur</SheetTitle>
                                      <SheetDescription>
                                        Éditer les informations de {user.username}
                                      </SheetDescription>
                                    </SheetHeader>
                                    <div className="py-4">
                                      <p>Formulaire de modification à implémenter</p>
                                    </div>
                                  </SheetContent>
                                </Sheet>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestion des Cours</CardTitle>
                    <CardDescription>Liste de tous les cours</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un cours
                  </Button>
                </CardHeader>
                <CardContent>
                  {coursesLoading ? (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableCaption>Liste des cours</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Titre</TableHead>
                          <TableHead>Langue</TableHead>
                          <TableHead>Niveau</TableHead>
                          <TableHead>Instructeur</TableHead>
                          <TableHead>Publié</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCourses?.map((course: CourseType) => (
                          <TableRow key={course.id}>
                            <TableCell>{course.id}</TableCell>
                            <TableCell>{course.title}</TableCell>
                            <TableCell>{course.language}</TableCell>
                            <TableCell>{course.level}</TableCell>
                            <TableCell>{course.instructor}</TableCell>
                            <TableCell>
                              <Checkbox 
                                checked={course.is_published}
                                onCheckedChange={(checked) => 
                                  toggleCoursePublished.mutate({ 
                                    courseId: course.id, 
                                    isPublished: checked as boolean 
                                  })
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/course/${course.id}`)}
                                >
                                  Voir
                                </Button>
                                <Sheet>
                                  <SheetTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </SheetTrigger>
                                  <SheetContent>
                                    <SheetHeader>
                                      <SheetTitle>Modifier le cours</SheetTitle>
                                      <SheetDescription>
                                        Éditer les informations du cours {course.title}
                                      </SheetDescription>
                                    </SheetHeader>
                                    <div className="py-4">
                                      <p>Formulaire de modification à implémenter</p>
                                    </div>
                                  </SheetContent>
                                </Sheet>
                                <Button variant="destructive" size="sm">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des Certificats</CardTitle>
                  <CardDescription>Validation et vérification des certificats émis</CardDescription>
                </CardHeader>
                <CardContent>
                  {certificatesLoading ? (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableCaption>Liste des certificats</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Code certificat</TableHead>
                          <TableHead>Cours</TableHead>
                          <TableHead>Utilisateur</TableHead>
                          <TableHead>Date d'émission</TableHead>
                          <TableHead>Validité</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCertificates?.map((certificate: CertificateType) => (
                          <TableRow key={certificate.id}>
                            <TableCell>{certificate.id}</TableCell>
                            <TableCell>{certificate.certificate_id}</TableCell>
                            <TableCell>{certificate.title}</TableCell>
                            <TableCell>{certificate.user}</TableCell>
                            <TableCell>{new Date(certificate.issue_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={certificate.is_valid ? "success" : "destructive"}
                              >
                                {certificate.is_valid ? "Valide" : "Invalide"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/certificate/${certificate.certificate_id}`)}
                                >
                                  Voir
                                </Button>
                                <Button
                                  variant={certificate.is_valid ? "destructive" : "default"}
                                  size="sm"
                                  onClick={() => toggleCertificateValid.mutate({ 
                                    certificateId: certificate.id, 
                                    isValid: !certificate.is_valid 
                                  })}
                                >
                                  {certificate.is_valid ? "Invalider" : "Valider"}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
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

export default Admin;

