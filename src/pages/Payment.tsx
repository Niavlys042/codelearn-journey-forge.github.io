
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Check, Lock, Shield, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Récupérer les détails du plan depuis les paramètres d'URL ou location state
  // Dans un cas réel, vous récupéreriez ces informations de votre backend
  const planDetails = {
    name: location.state?.planName || "Premium",
    price: location.state?.planPrice || "19.99€",
    interval: location.state?.planInterval || "mensuel",
    features: location.state?.planFeatures || [
      "Accès à tous les cours",
      "Exercices illimités",
      "Défis hebdomadaires",
      "Certifications de base",
      "Support par email"
    ]
  };

  const formatCardNumber = (value: string) => {
    // Supprimer tous les caractères non numériques
    const numericValue = value.replace(/\D/g, '');
    
    // Limiter à 16 chiffres
    const truncatedValue = numericValue.slice(0, 16);
    
    // Ajouter des espaces tous les 4 chiffres
    const formattedValue = truncatedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formattedValue;
  };

  const formatExpiryDate = (value: string) => {
    // Supprimer tous les caractères non numériques
    const numericValue = value.replace(/\D/g, '');
    
    // Limiter à 4 chiffres
    const truncatedValue = numericValue.slice(0, 4);
    
    // Ajouter un slash après les 2 premiers chiffres (MM/YY)
    if (truncatedValue.length > 2) {
      return `${truncatedValue.slice(0, 2)}/${truncatedValue.slice(2)}`;
    }
    
    return truncatedValue;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    // Valider le format de la carte (simple)
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError("Numéro de carte invalide");
      return;
    }
    
    // Valider la date d'expiration (simple)
    const [month, year] = expiryDate.split('/');
    if (!month || !year || parseInt(month) > 12 || parseInt(month) < 1) {
      setError("Date d'expiration invalide");
      return;
    }
    
    // Valider le CVV (simple)
    if (cvv.length < 3 || cvv.length > 4) {
      setError("Code de sécurité invalide");
      return;
    }
    
    setIsLoading(true);
    setError("");

    try {
      // Simulation de paiement réussi (à remplacer par l'appel à l'API backend)
      setTimeout(() => {
        console.log("Tentative de paiement avec:", { 
          cardNumber: cardNumber.replace(/\s/g, ''), 
          cardName, 
          expiryDate, 
          cvv,
          plan: planDetails.name,
          price: planDetails.price
        });
        
        // Redirection vers la page de succès après paiement
        navigate("/payment-success");
        
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("Erreur lors du paiement. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Paiement</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Résumé de l'abonnement */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de votre abonnement</CardTitle>
                  <CardDescription>
                    Plan {planDetails.name} - {planDetails.interval}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center font-medium">
                      <span>Sous-total</span>
                      <span>{planDetails.price}</span>
                    </div>
                    <div className="flex justify-between items-center font-medium">
                      <span>TVA (20%)</span>
                      <span>{(parseFloat(planDetails.price) * 0.2).toFixed(2)}€</span>
                    </div>
                    <div className="border-t pt-2"></div>
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span>{(parseFloat(planDetails.price) * 1.2).toFixed(2)}€</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium">Inclus dans votre abonnement :</h4>
                    <ul className="space-y-2">
                      {planDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Formulaire de paiement */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-2" />
                    Informations de paiement
                  </CardTitle>
                  <CardDescription>
                    Entrez les informations de votre carte bancaire
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="pl-10"
                          maxLength={19}
                          required
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="#FFB700" />
                            <circle cx="9" cy="12" r="4" fill="#FF5F00" />
                            <circle cx="15" cy="12" r="4" fill="#FF5F00" />
                            <path d="M12 8C13.1046 8 14 9.79594 14 12C14 14.2041 13.1046 16 12 16C10.8954 16 10 14.2041 10 12C10 9.79594 10.8954 8 12 8Z" fill="#FF9A00" />
                          </svg>
                          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="4" fill="#1A1F71" />
                            <path d="M9 13.5L10.5 9H12L10.5 15H9L9 13.5Z" fill="#FFFFFF" />
                            <path d="M12 9H14.5C15.3284 9 16 9.67157 16 10.5C16 11.3284 15.3284 12 14.5 12H12V9Z" fill="#FFFFFF" />
                            <path d="M12 12H14C14.8284 12 15.5 12.6716 15.5 13.5C15.5 14.3284 14.8284 15 14 15H12V12Z" fill="#FFFFFF" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nom sur la carte</Label>
                      <Input
                        id="cardName"
                        placeholder="Jean Dupont"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Date d'expiration</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/AA"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">
                          <div className="flex items-center">
                            <span>CVV</span>
                            <div className="ml-1 text-xs text-gray-500 cursor-help" title="Code de 3 ou 4 chiffres au dos de votre carte">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm mt-4">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Vos informations sont cryptées et sécurisées
                      </span>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Traitement en cours...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Lock className="mr-2 h-5 w-5" />
                          Payer {(parseFloat(planDetails.price) * 1.2).toFixed(2)}€
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="text-sm text-center text-muted-foreground">
                    En finalisant votre paiement, vous acceptez nos{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      Conditions d'utilisation
                    </a>
                    {" "}et notre{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Politique de confidentialité
                    </a>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <img src="https://placehold.co/40x25?text=Visa" alt="Visa" className="h-6" />
                    <img src="https://placehold.co/40x25?text=MC" alt="Mastercard" className="h-6" />
                    <img src="https://placehold.co/40x25?text=Amex" alt="American Express" className="h-6" />
                    <img src="https://placehold.co/40x25?text=PayPal" alt="PayPal" className="h-6" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;
