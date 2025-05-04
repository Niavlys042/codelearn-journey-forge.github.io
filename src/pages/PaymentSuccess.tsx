
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Afficher une notification de succès
    toast({
      title: "Paiement réussi!",
      description: "Votre abonnement est maintenant actif.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-lg mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="mb-6 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              
              <h1 className="text-2xl font-bold mb-2">Paiement réussi!</h1>
              
              <p className="text-muted-foreground mb-6">
                Merci pour votre achat. Votre abonnement est maintenant actif.
              </p>
              
              <div className="space-y-2 w-full mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Numéro de commande:</span>
                  <span className="font-medium">#CL-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Méthode de paiement:</span>
                  <span className="font-medium">****** 1234</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate("/courses")}
                >
                  Explorer les cours
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => navigate("/dashboard")}
                >
                  Accéder à votre tableau de bord
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground">
                Un e-mail de confirmation a été envoyé à votre adresse e-mail.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
