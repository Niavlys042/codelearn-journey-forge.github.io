
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Book, 
  FileText, 
  Settings, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  ShieldCheck,
  Shield
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Fonctions d'API pour les appels au backend
const api = {
  fetchUsers: async () => {
    const response = await fetch("http://localhost:8000/api/users/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
    return response.json();
  },
  
  fetchCourses: async () => {
    const response = await fetch("http://localhost:8000/api/courses/courses/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors du chargement des cours");
    return response.json();
  },
  
  fetchCertificates: async () => {
    const response = await fetch("http://localhost:8000/api/certificates/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors du chargement des certificats");
    return response.json();
  },
  
  fetchDashboard: async () => {
    const response = await fetch("http://localhost:8000/api/users/admin/dashboard/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors du chargement du tableau de bord");
    return response.json();
  },
  
  toggleUserPremium: async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/users/${id}/toggle_premium/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors de la modification du statut premium");
    return response.json();
  },
  
  toggleUserAdmin: async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/users/${id}/toggle_admin/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors de la modification du statut administrateur");
    return response.json();
  },
  
  validateCertificate: async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/certificates/${id}/validate/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors de la validation du certificat");
    return response.json();
  },
  
  invalidateCertificate: async (id: number) => {
    const response = await fetch(`http://localhost:8000/api/certificates/${id}/invalidate/`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Erreur lors de l'invalidation du certificat");
    return response.json();
  },
};

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Vérifier si l'utilisateur est bien admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.is_admin) {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'accès à cette page.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [navigate, toast]);
  
  // Récupération des données
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: api.fetchUsers,
  });
  
  const { data: courses, isLoading: loadingCourses } = useQuery({
    queryKey: ["admin", "courses"],
    queryFn: api.fetchCourses,
  });
  
  const { data: certificates, isLoading: loadingCertificates } = useQuery({
    queryKey: ["admin", "certificates"],
    queryFn: api.fetchCertificates,
  });
  
  const { data: dashboardData, isLoading: loadingDashboard } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: api.fetchDashboard,
  });
  
  // Mutations
  const togglePremiumMutation = useMutation({
    mutationFn: api.toggleUserPremium,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast({
        title: "Succès",
        description: "Le statut premium de l'utilisateur a été modifié.",
        variant: "success",
      });
    },
  });
  
  const toggleAdminMutation = useMutation({
    mutationFn: api.toggleUserAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast({
        title: "Succès",
        description: "Le statut administrateur de l'utilisateur a été modifié.",
        variant: "success",
      });
    },
  });
  
  const validateCertificateMutation = useMutation({
    mutationFn: api.validateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "certificates"] });
      toast({
        title: "Succès",
        description: "Le certificat a été validé.",
        variant: "success",
      });
    },
  });
  
  const invalidateCertificateMutation = useMutation({
    mutationFn: api.invalidateCertificate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "certificates"] });
      toast({
        title: "Succès",
        description: "Le certificat a été invalidé.",
        variant: "destructive",
      });
    },
  });
  
  // Filtrer les résultats en fonction de la recherche
  const filteredUsers = users?.filter(
    (user: any) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCourses = courses?.results?.filter(
    (course: any) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCertificates = certificates?.filter(
    (cert: any) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificate_id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Administration CodeLearn</h1>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Settings className="text-primary mr-2" />
            <h2 className="text-xl font-semibold">Panneau d'administration</h2>
          </div>
          <div className="w-1/3">
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Utilisateurs
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Cours
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Certificats
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            {loadingDashboard ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              dashboardData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Utilisateurs</CardTitle>
                      <CardDescription>Nombre total</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{dashboardData.total_users}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Premium</CardTitle>
                      <CardDescription>Utilisateurs premium</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{dashboardData.premium_users}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Cours</CardTitle>
                      <CardDescription>Nombre total</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{dashboardData.total_courses}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Certificats</CardTitle>
                      <CardDescription>Émis au total</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{dashboardData.total_certificates}</p>
                    </CardContent>
                  </Card>
                </div>
              )
            )}
            
            {dashboardData?.recent_users && (
              <Card>
                <CardHeader>
                  <CardTitle>Nouveaux utilisateurs</CardTitle>
                  <CardDescription>Utilisateurs récemment inscrits</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Admin</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dashboardData.recent_users.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.date_joined).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {user.is_premium ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Premium
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Standard
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.is_admin ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Utilisateur
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Consulter et modifier les utilisateurs de la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingUsers ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom d'utilisateur</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Premium</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers?.map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>
                            {user.is_premium ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Premium
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Standard
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.is_admin ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Utilisateur
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>Options utilisateur</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => togglePremiumMutation.mutate(user.id)}
                                >
                                  {user.is_premium ? "Retirer premium" : "Ajouter premium"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => toggleAdminMutation.mutate(user.id)}
                                >
                                  {user.is_admin ? "Retirer admin" : "Promouvoir admin"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
              <CardHeader>
                <CardTitle>Gestion des cours</CardTitle>
                <CardDescription>
                  Consulter et modifier les cours disponibles sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCourses ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Langage</TableHead>
                        <TableHead>Niveau</TableHead>
                        <TableHead>Publié</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses?.map((course: any) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.id}</TableCell>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.language}</TableCell>
                          <TableCell>{course.level}</TableCell>
                          <TableCell>
                            {course.is_published ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Publié
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Brouillon
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{course.price} €</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/course/${course.id}`)}
                            >
                              Voir
                            </Button>
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
                <CardTitle>Gestion des certificats</CardTitle>
                <CardDescription>
                  Consulter et valider les certificats émis sur la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingCertificates ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Identifiant</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Date d'émission</TableHead>
                        <TableHead>État</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCertificates?.map((cert: any) => (
                        <TableRow key={cert.id}>
                          <TableCell>{cert.id}</TableCell>
                          <TableCell className="font-medium">{cert.certificate_id}</TableCell>
                          <TableCell>{cert.title}</TableCell>
                          <TableCell>{cert.user.email}</TableCell>
                          <TableCell>{new Date(cert.issue_date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {cert.is_valid ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Valide
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Invalidé
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/certificate/${cert.id}`)}
                              >
                                Voir
                              </Button>
                              {cert.is_valid ? (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => invalidateCertificateMutation.mutate(cert.id)}
                                >
                                  Invalider
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() => validateCertificateMutation.mutate(cert.id)}
                                >
                                  Valider
                                </Button>
                              )}
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
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
