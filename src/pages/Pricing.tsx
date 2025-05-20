
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { subscriptionService } from "@/services/api";
import { toast } from "sonner";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthly: number;
  annual: number;
  currency: string;
  highlighted: boolean;
  features: PlanFeature[];
}

// Taux de conversion: 1 EUR = environ 4500 Ariary (MGA)
const EURO_TO_ARIARY_RATE = 4500;

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les plans d'abonnement depuis l'API
    const fetchPlans = async () => {
      try {
        // Si l'API est disponible, nous pouvons utiliser ce code
        // const response = await subscriptionService.getPlans();
        // setPlans(response.data);
        
        // Pour le moment, utilisons les plans statiques convertis en Ariary
        setPlans([
          {
            id: "free",
            name: "Gratuit",
            description: "Pour commencer votre voyage d'apprentissage",
            monthly: 0,
            annual: 0,
            currency: "Ar",
            highlighted: false,
            features: [
              { name: "Accès à 5 cours de base", included: true },
              { name: "Exercices limités", included: true },
              { name: "Support communautaire", included: true },
              { name: "Certificats de base", included: false },
              { name: "Suivi de progression", included: false },
              { name: "Exercices pratiques avancés", included: false },
              { name: "Support prioritaire", included: false },
              { name: "Accès aux projets guidés", included: false },
              { name: "Contenu exclusif", included: false }
            ]
          },
          {
            id: "premium",
            name: "Premium",
            description: "Notre formule la plus populaire",
            monthly: 19.99 * EURO_TO_ARIARY_RATE,
            annual: 199.90 * EURO_TO_ARIARY_RATE,
            currency: "Ar",
            highlighted: true,
            features: [
              { name: "Accès à tous les cours", included: true },
              { name: "Exercices illimités", included: true },
              { name: "Support communautaire", included: true },
              { name: "Certificats de base", included: true },
              { name: "Suivi de progression", included: true },
              { name: "Exercices pratiques avancés", included: true },
              { name: "Support prioritaire", included: false },
              { name: "Accès aux projets guidés", included: false },
              { name: "Contenu exclusif", included: false }
            ]
          },
          {
            id: "pro",
            name: "Pro",
            description: "Pour les apprenants sérieux et professionnels",
            monthly: 39.99 * EURO_TO_ARIARY_RATE,
            annual: 399.90 * EURO_TO_ARIARY_RATE,
            currency: "Ar",
            highlighted: false,
            features: [
              { name: "Accès à tous les cours", included: true },
              { name: "Exercices illimités", included: true },
              { name: "Support communautaire", included: true },
              { name: "Certificats de base", included: true },
              { name: "Suivi de progression", included: true },
              { name: "Exercices pratiques avancés", included: true },
              { name: "Support prioritaire", included: true },
              { name: "Accès aux projets guidés", included: true },
              { name: "Contenu exclusif", included: true }
            ]
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des plans:", error);
        toast.error("Impossible de charger les plans d'abonnement");
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = async (planId: string) => {
    try {
      // Si c'est le plan gratuit, rediriger vers l'inscription
      if (planId === "free") {
        navigate("/signup");
        return;
      }

      // Pour les plans payants, rediriger vers la page de paiement avec les détails du plan
      const selectedPlan = plans.find(plan => plan.id === planId);
      if (selectedPlan) {
        // Option 1: Utilisation de l'API pour créer un paiement
        // const paymentData = {
        //   plan_id: selectedPlan.id,
        //   amount: billingCycle === "monthly" ? selectedPlan.monthly : selectedPlan.annual,
        //   cycle: billingCycle
        // };
        // await paymentService.createPayment(paymentData);
        
        // Option 2: Navigation vers la page de paiement avec les détails
        navigate("/payment", { 
          state: { 
            planName: selectedPlan.name,
            planPrice: billingCycle === "monthly" ? selectedPlan.monthly : selectedPlan.annual,
            planInterval: billingCycle === "monthly" ? "mensuel" : "annuel",
            planFeatures: selectedPlan.features.filter(f => f.included).map(f => f.name),
            currency: selectedPlan.currency
          } 
        });
      }
    } catch (error) {
      console.error("Erreur lors de la sélection du plan:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  // Calculer la réduction pour les plans annuels
  const getDiscount = (monthly: number, annual: number) => {
    if (monthly === 0) return 0;
    const monthlyTotal = monthly * 12;
    const discount = Math.round((1 - annual / monthlyTotal) * 100);
    return discount;
  };

  // Formater les prix pour afficher les milliers avec un espace
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choisissez le plan qui vous convient</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Accédez à des cours de qualité et développez vos compétences en programmation avec nos différentes formules d'abonnement.
            </p>
            
            <div className="mt-8 flex justify-center">
              <Tabs 
                defaultValue="monthly" 
                value={billingCycle}
                onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
                className="w-[300px]"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                  <TabsTrigger value="annual">Annuel</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Plans de tarification */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`flex flex-col ${
                  plan.highlighted 
                    ? 'border-primary shadow-lg shadow-primary/20 relative' 
                    : ''
                }`}
              >
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Le plus populaire
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-3xl font-bold">
                        {formatPrice(billingCycle === "monthly" ? plan.monthly : plan.annual)}
                      </span>
                      <span className="text-xl ml-1">{plan.currency}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {billingCycle === "monthly" ? "/mois" : "/an"}
                      </span>
                    </div>
                    
                    {billingCycle === "annual" && plan.monthly > 0 && (
                      <div className="mt-1 text-sm text-green-600">
                        Économisez {getDiscount(plan.monthly, plan.annual)}% avec la facturation annuelle
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {plan.id === "free" ? "Commencer gratuitement" : "Choisir ce plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* FAQ */}
        <div className="bg-secondary">
          <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "Puis-je changer de plan plus tard ?",
                  answer: "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les ajustements de facturation seront calculés au prorata."
                },
                {
                  question: "Y a-t-il une période d'essai ?",
                  answer: "Tous nos plans payants sont accompagnés d'une garantie de remboursement de 14 jours. Si vous n'êtes pas satisfait, nous vous rembourserons intégralement."
                },
                {
                  question: "Comment fonctionnent les certificats ?",
                  answer: "Les certificats sont délivrés après avoir terminé un cours avec succès. Ils peuvent être partagés sur votre profil LinkedIn ou téléchargés au format PDF."
                },
                {
                  question: "Les plans incluent-ils des projets pratiques ?",
                  answer: "Oui, tous nos plans incluent des projets pratiques. Les plans Premium et Pro offrent des projets plus avancés et guidés pour une expérience d'apprentissage plus complète."
                },
                {
                  question: "Comment fonctionne la facturation annuelle ?",
                  answer: "La facturation annuelle vous permet d'économiser jusqu'à 20% par rapport à la facturation mensuelle. Vous êtes facturé une fois par an pour un accès de 12 mois."
                },
                {
                  question: "Quelle est la différence entre le support communautaire et le support prioritaire ?",
                  answer: "Le support communautaire est assuré par la communauté des apprenants et nos modérateurs. Le support prioritaire vous donne accès à nos instructeurs avec un temps de réponse garanti de 24 heures."
                }
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Vous avez d'autres questions? Contactez notre équipe de support.
              </p>
              <Button variant="outline">Contacter le support</Button>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Prêt à développer vos compétences?</h2>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              Rejoignez plus de 100 000 apprenants qui développent leurs compétences en programmation avec CodeLearn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate("/signup")}
              >
                S'inscrire gratuitement
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => handlePlanSelect("premium")}
              >
                Essayer Premium
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
