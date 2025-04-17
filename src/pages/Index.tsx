
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Code, BookOpen, Award, ArrowRight, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Cours Interactifs",
      description: "Apprenez en pratiquant avec nos leçons interactives conçues par des experts."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Vaste Bibliothèque",
      description: "Accédez à des cours sur plus de 20 langages de programmation populaires."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Certifications",
      description: "Obtenez des certifications reconnues pour valoriser vos compétences."
    }
  ];

  const languagesOffered = [
    "Python", "JavaScript", "Java", "C++", "PHP", "Ruby", "Swift", "Go", "Rust"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900 opacity-90"></div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Devenez un expert en programmation
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Apprenez à coder avec des cours interactifs et obtenez des certifications reconnues sur CodeLearn.
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Button size="lg" onClick={() => navigate("/courses")}>
                  Explorer les cours
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/signup")} className="text-white border-white hover:bg-white hover:text-purple-800">
                  Commencer gratuitement
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Code Sample */}
        <section className="bg-secondary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Apprenez par la pratique
                </h2>
                <p className="mt-3 max-w-3xl text-lg">
                  Notre approche pratique vous permet d'écrire du code réel dès le premier jour.
                  Suivez nos exercices interactifs et développez vos compétences progressivement.
                </p>
                <div className="mt-8 flex">
                  <div className="rounded-md shadow">
                    <Button onClick={() => navigate("/signup")} className="flex items-center">
                      Essayer maintenant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="code-editor">
                  <pre className="text-sm sm:text-base">
                    <code>
{`# Votre premier programme en Python
def saluer(nom):
    return f"Bonjour, {nom}!"

# Appel de la fonction
message = saluer("Apprenant")
print(message)

# Résultat: Bonjour, Apprenant!`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Fonctionnalités</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Tout ce dont vous avez besoin pour réussir
              </p>
              <p className="mt-4 max-w-2xl text-xl lg:mx-auto">
                Une plateforme complète qui vous accompagne à chaque étape de votre parcours d'apprentissage.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {features.map((feature, index) => (
                  <div key={index} className="relative">
                    <div className="absolute flex items-center justify-center h-16 w-16 rounded-md bg-primary-foreground border border-primary">
                      {feature.icon}
                    </div>
                    <div className="ml-20">
                      <h3 className="text-lg font-medium">{feature.title}</h3>
                      <p className="mt-2 text-base">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Languages Section */}
        <section className="py-12 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Langages</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Maîtrisez les langages les plus demandés
              </p>
              <p className="mt-4 max-w-2xl text-xl lg:mx-auto">
                Nos cours couvrent un large éventail de langages de programmation pour répondre à tous vos besoins.
              </p>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {languagesOffered.map((language, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 border border-muted-foreground/20 rounded-lg bg-card hover:border-primary hover:shadow transition-all duration-200">
                    <span className="text-lg font-medium">{language}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Tarifs</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Des plans adaptés à tous
              </p>
              <p className="mt-4 max-w-2xl text-xl lg:mx-auto">
                Choisissez le plan qui correspond le mieux à vos besoins et à votre budget.
              </p>
            </div>

            <div className="mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
              {/* Free Plan */}
              <div className="border border-muted-foreground/20 rounded-lg p-8 bg-card shadow-sm hover:shadow-md transition-all duration-200">
                <div>
                  <h3 className="text-lg font-medium">Gratuit</h3>
                  <p className="mt-4 text-sm">Parfait pour débuter et explorer</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold">0€</span>
                    <span className="text-base font-medium text-muted-foreground">/mois</span>
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Accès aux cours de base</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">5 exercices par jour</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Forum communautaire</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                    Commencer
                  </Button>
                </div>
              </div>

              {/* Premium Plan */}
              <div className="border-2 border-primary rounded-lg p-8 bg-card relative shadow-lg hover:shadow-xl transition-all duration-200">
                <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
                    Populaire
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Premium</h3>
                  <p className="mt-4 text-sm">Idéal pour l'apprentissage sérieux</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold">19€</span>
                    <span className="text-base font-medium text-muted-foreground">/mois</span>
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Accès à tous les cours</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Exercices illimités</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Défis hebdomadaires</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Certifications de base</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Support par email</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button className="w-full" onClick={() => navigate("/signup")}>
                    S'abonner
                  </Button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="border border-muted-foreground/20 rounded-lg p-8 bg-card shadow-sm hover:shadow-md transition-all duration-200">
                <div>
                  <h3 className="text-lg font-medium">Pro</h3>
                  <p className="mt-4 text-sm">Pour les développeurs en devenir</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold">39€</span>
                    <span className="text-base font-medium text-muted-foreground">/mois</span>
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Tout ce qui est inclus dans Premium</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Projets pratiques guidés</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Toutes les certifications</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Sessions de mentorat (2/mois)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="ml-3 text-sm">Support prioritaire</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button variant="outline" className="w-full" onClick={() => navigate("/signup")}>
                    S'abonner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Témoignages</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                Ce que disent nos apprenants
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                {
                  quote: "CodeLearn m'a permis d'acquérir les compétences nécessaires pour changer de carrière et trouver un emploi de développeur.",
                  name: "Sophie Martin",
                  role: "Développeuse Web"
                },
                {
                  quote: "Les cours sont très bien structurés et les exercices pratiques m'ont vraiment aidé à consolider mes connaissances.",
                  name: "Thomas Dubois",
                  role: "Étudiant en informatique"
                },
                {
                  quote: "Grâce à la certification obtenue sur CodeLearn, j'ai pu valoriser mes compétences auprès de mon employeur.",
                  name: "Léa Bernard",
                  role: "Data Analyst"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-card shadow rounded-lg p-6 border border-muted-foreground/20">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-base italic">{testimonial.quote}</p>
                      <div className="mt-4">
                        <p className="text-base font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-800 to-indigo-900">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Prêt à commencer votre parcours ?</span>
              <span className="block text-indigo-300">Rejoignez des milliers d'apprenants dès aujourd'hui.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button size="lg" onClick={() => navigate("/signup")} className="bg-white text-purple-800 hover:bg-gray-100">
                  Commencer gratuitement
                </Button>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Button variant="outline" size="lg" onClick={() => navigate("/courses")} className="text-white border-white hover:bg-white hover:text-purple-800">
                  Explorer les cours
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
