
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Download, Share2, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Certificate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Dans un cas réel, vous récupéreriez ces informations depuis votre backend
  const certificateData = location.state?.certificateData || {
    id: "CERT-PY-12345",
    courseName: "Python pour les Développeurs",
    studentName: "Jean Dupont",
    completionDate: "15 Avril 2025",
    score: 92,
    issueDate: "17 Avril 2025",
    validityPeriod: "2 ans",
    skills: [
      "Principes fondamentaux de Python",
      "Programmation orientée objet",
      "Traitement de données avec Pandas",
      "Développement d'API avec Flask",
      "Tests et débogage"
    ]
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulation du téléchargement (à remplacer par la logique réelle)
    setTimeout(() => {
      // Dans un cas réel, vous généreriez et téléchargeriez le PDF ici
      console.log("Téléchargement du certificat:", certificateData);
      setIsDownloading(false);
      
      // Simulons une alerte pour indiquer le succès
      alert("Le certificat a été téléchargé avec succès!");
    }, 1500);
  };

  const handleShare = () => {
    // Simulation du partage (à remplacer par la logique réelle)
    if (navigator.share) {
      navigator.share({
        title: `Certificat CodeLearn - ${certificateData.courseName}`,
        text: `J'ai obtenu un certificat pour le cours ${certificateData.courseName} sur CodeLearn!`,
        url: window.location.href,
      })
      .then(() => console.log('Certificat partagé avec succès'))
      .catch((error) => console.log('Erreur lors du partage:', error));
    } else {
      // Fallback si l'API Web Share n'est pas disponible
      alert("Lien du certificat copié dans le presse-papier!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Votre Certificat</h1>
            <p className="text-muted-foreground mt-2">
              Félicitations pour l'obtention de votre certificat!
            </p>
          </div>
          
          <Card className="border-4 border-primary/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-[url('https://placehold.co/800x100/9b87f5/FFFFFF?text=CodeLearn')] bg-cover h-24"></div>
              
              <div className="p-8 flex flex-col items-center text-center">
                <div className="mb-6">
                  <Award className="h-16 w-16 text-primary" />
                </div>
                
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-1">Certificat d'Achèvement</h2>
                <p className="text-muted-foreground text-sm mb-8">ID: {certificateData.id}</p>
                
                <p className="text-lg">Ce certificat est décerné à</p>
                <h3 className="text-3xl font-serif mt-2 mb-4 text-primary">{certificateData.studentName}</h3>
                
                <p className="text-lg mb-1">pour avoir complété avec succès le cours</p>
                <h4 className="text-2xl font-bold mb-6">{certificateData.courseName}</h4>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Date d'achèvement</p>
                    <p className="font-medium">{certificateData.completionDate}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Score final</p>
                    <p className="font-medium">{certificateData.score}%</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Date d'émission</p>
                    <p className="font-medium">{certificateData.issueDate}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Validité</p>
                    <p className="font-medium">{certificateData.validityPeriod}</p>
                  </div>
                </div>
                
                <div className="w-full mb-8">
                  <h5 className="font-medium mb-2">Compétences acquises</h5>
                  <div className="flex flex-wrap justify-center gap-2">
                    {certificateData.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="flex-1">
                    <div className="text-center">
                      <div className="font-serif text-xl mb-2">Dr. Sarah Laurent</div>
                      <div className="h-px w-40 bg-gray-400 mx-auto mb-1"></div>
                      <p className="text-sm text-muted-foreground">Directrice de la Formation</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-center">
                      <div className="font-serif text-xl mb-2">Prof. Marc Dubois</div>
                      <div className="h-px w-40 bg-gray-400 mx-auto mb-1"></div>
                      <p className="text-sm text-muted-foreground">Chef du Département Technique</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-sm text-muted-foreground">
                  <p>Pour vérifier l'authenticité de ce certificat, veuillez visiter:</p>
                  <a href="#" className="text-primary hover:underline">codelearn.com/verify/{certificateData.id}</a>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Téléchargement...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Télécharger le certificat (PDF)
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleShare}
              className="flex items-center"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Partager
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/certifications")}
              className="flex items-center"
            >
              <FileText className="mr-2 h-5 w-5" />
              Tous les certificats
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificate;
