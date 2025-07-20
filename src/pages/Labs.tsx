import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BodyStats {
  height: number;
  chest: number;
  waist: number;
  shoulders: number;
}

interface TShirt {
  id: string;
  name: string;
  sizes: {
    [key: string]: {
      chest: number;
      length: number;
      shoulders: number;
    };
  };
  color: string;
  image: string;
}

const tshirts: TShirt[] = [
  {
    id: '1',
    name: 'Classic Cotton Tee',
    color: '#3B82F6',
    image: '/placeholder.svg',
    sizes: {
      'S': { chest: 36, length: 26, shoulders: 17 },
      'M': { chest: 40, length: 28, shoulders: 18 },
      'L': { chest: 44, length: 30, shoulders: 19 },
      'XL': { chest: 48, length: 32, shoulders: 20 }
    }
  },
  {
    id: '2',
    name: 'Premium Fit Tee',
    color: '#EF4444',
    image: '/placeholder.svg',
    sizes: {
      'S': { chest: 35, length: 25, shoulders: 16.5 },
      'M': { chest: 39, length: 27, shoulders: 17.5 },
      'L': { chest: 43, length: 29, shoulders: 18.5 },
      'XL': { chest: 47, length: 31, shoulders: 19.5 }
    }
  },
  {
    id: '3',
    name: 'Sporty Mesh Tee',
    color: '#10B981',
    image: '/placeholder.svg',
    sizes: {
      'S': { chest: 37, length: 27, shoulders: 17.5 },
      'M': { chest: 41, length: 29, shoulders: 18.5 },
      'L': { chest: 45, length: 31, shoulders: 19.5 },
      'XL': { chest: 49, length: 33, shoulders: 20.5 }
    }
  }
];

const Labs = () => {
  const [bodyStats, setBodyStats] = useState<BodyStats>({
    height: 175,
    chest: 40,
    waist: 32,
    shoulders: 18
  });
  
  const [selectedTShirt, setSelectedTShirt] = useState<TShirt>(tshirts[0]);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const getFitAnalysis = () => {
    const tshirtMeasurements = selectedTShirt.sizes[selectedSize];
    const chestFit = tshirtMeasurements.chest - bodyStats.chest;
    const shoulderFit = tshirtMeasurements.shoulders - bodyStats.shoulders;
    
    let fitStatus = 'perfect';
    let fitMessage = 'Perfect fit!';
    
    if (chestFit < 2 || shoulderFit < 0.5) {
      fitStatus = 'tight';
      fitMessage = 'This size might be too tight';
    } else if (chestFit > 8 || shoulderFit > 3) {
      fitStatus = 'loose';
      fitMessage = 'This size might be too loose';
    }
    
    return { fitStatus, fitMessage, chestFit, shoulderFit };
  };

  const { fitStatus, fitMessage } = getFitAnalysis();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">BUGZY Labs</h1>
              <p className="text-muted-foreground">Virtual T-Shirt Fitting Experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Body Statistics Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shirt className="h-5 w-5" />
                Your Body Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Height: {bodyStats.height}cm</label>
                <Slider
                  value={[bodyStats.height]}
                  onValueChange={(value) => setBodyStats(prev => ({ ...prev, height: value[0] }))}
                  min={150}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Chest: {bodyStats.chest}"</label>
                <Slider
                  value={[bodyStats.chest]}
                  onValueChange={(value) => setBodyStats(prev => ({ ...prev, chest: value[0] }))}
                  min={30}
                  max={50}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Waist: {bodyStats.waist}"</label>
                <Slider
                  value={[bodyStats.waist]}
                  onValueChange={(value) => setBodyStats(prev => ({ ...prev, waist: value[0] }))}
                  min={26}
                  max={46}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Shoulders: {bodyStats.shoulders}"</label>
                <Slider
                  value={[bodyStats.shoulders]}
                  onValueChange={(value) => setBodyStats(prev => ({ ...prev, shoulders: value[0] }))}
                  min={14}
                  max={24}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Virtual Dummy */}
          <Card>
            <CardHeader>
              <CardTitle>Virtual Try-On</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted/30 rounded-lg p-8 h-96 flex items-center justify-center">
                {/* Simple dummy representation */}
                <div className="relative">
                  {/* Body outline */}
                  <div 
                    className="w-24 h-40 border-2 border-muted-foreground/30 rounded-t-full rounded-b-lg relative"
                    style={{ 
                      width: `${Math.max(60, bodyStats.chest * 1.5)}px`,
                      height: `${Math.max(120, bodyStats.height * 0.8)}px`
                    }}
                  >
                    {/* Head */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-muted-foreground/30 rounded-full"></div>
                    
                    {/* T-shirt overlay */}
                    <div 
                      className="absolute inset-0 rounded-t-lg rounded-b-lg opacity-80"
                      style={{ 
                        backgroundColor: selectedTShirt.color,
                        top: '10px',
                        height: 'calc(100% - 20px)'
                      }}
                    ></div>
                    
                    {/* Arms */}
                    <div className="absolute -left-3 top-2 w-6 h-16 border-2 border-muted-foreground/30 rounded-lg"></div>
                    <div className="absolute -right-3 top-2 w-6 h-16 border-2 border-muted-foreground/30 rounded-lg"></div>
                  </div>
                  
                  {/* Legs */}
                  <div className="flex gap-2 justify-center mt-1">
                    <div className="w-6 h-20 border-2 border-muted-foreground/30 rounded-lg"></div>
                    <div className="w-6 h-20 border-2 border-muted-foreground/30 rounded-lg"></div>
                  </div>
                </div>
              </div>
              
              {/* Fit Analysis */}
              <div className="mt-4 p-4 rounded-lg bg-muted/50">
                <Badge 
                  variant={fitStatus === 'perfect' ? 'default' : fitStatus === 'tight' ? 'destructive' : 'secondary'}
                  className="mb-2"
                >
                  {fitStatus === 'perfect' ? 'Perfect Fit' : fitStatus === 'tight' ? 'Too Tight' : 'Too Loose'}
                </Badge>
                <p className="text-sm text-muted-foreground">{fitMessage}</p>
              </div>
            </CardContent>
          </Card>

          {/* T-Shirt Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select T-Shirt & Size</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* T-shirt selection */}
              <div className="grid grid-cols-1 gap-3">
                {tshirts.map((tshirt) => (
                  <Button
                    key={tshirt.id}
                    variant={selectedTShirt.id === tshirt.id ? "default" : "outline"}
                    className="justify-start h-auto p-4"
                    onClick={() => setSelectedTShirt(tshirt)}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: tshirt.color }}
                      ></div>
                      <span>{tshirt.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              {/* Size selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(selectedTShirt.sizes).map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Size chart */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Size Chart (inches)</h4>
                <div className="text-xs space-y-1 bg-muted/30 p-3 rounded">
                  <div className="flex justify-between">
                    <span>Chest:</span>
                    <span>{selectedTShirt.sizes[selectedSize].chest}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Length:</span>
                    <span>{selectedTShirt.sizes[selectedSize].length}"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shoulders:</span>
                    <span>{selectedTShirt.sizes[selectedSize].shoulders}"</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Labs;