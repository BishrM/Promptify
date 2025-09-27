import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Target, Users } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold">AI Safety & Responsible Usage</h1>
          <p className="text-xl text-muted-foreground">
            Professional prompt filtering for educational institutions, enterprises, and AI platforms
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">The Problem We Solve</h2>
          <p className="text-lg leading-relaxed">
            With AI tools widely used in schools, workplaces, and the public, unsafe or unclear prompts can cause harm, bias, or wasted resources. 
            Promptify ensures prompts are safe, effective, and clear before being sent to AI systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Educational Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Protect students from generating inappropriate content while maintaining educational freedom. 
                Ensure classroom AI interactions remain productive and safe.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Enterprise Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Meet corporate AI usage policies and regulatory requirements. 
                Reduce liability while maximizing AI productivity in business environments.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Platform Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                AI platforms can integrate our engine to automatically filter user inputs, 
                reducing moderation costs and improving user experience.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-success mb-1">✓ ALLOW</h4>
                  <p className="text-sm text-muted-foreground">Safe for educational and professional use</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-warning mb-1">⚠ NEEDS_FIX</h4>
                  <p className="text-sm text-muted-foreground">Requires improvement for optimal results</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-semibold text-destructive mb-1">✗ BLOCK</h4>
                  <p className="text-sm text-muted-foreground">Contains unsafe or inappropriate content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Reduce AI misuse incidents by 85%
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Improve prompt quality and AI output effectiveness
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Ensure compliance with organizational policies
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Provide audit trails for usage monitoring
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;