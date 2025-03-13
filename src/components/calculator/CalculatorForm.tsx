
import React from "react";
import { Calculator, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema } from "./utils/calculationUtils";
import { cryptocurrencies } from "./utils/constants";
import { useState } from "react";

interface CalculatorFormProps {
  onSubmit: (values: FormValues) => void;
  isCalculating: boolean;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmit,
  isCalculating
}) => {
  const [cryptoSearch, setCryptoSearch] = useState("");
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialInvestment: 1000,
      cryptocurrency: "BTC",
      duration: "1",
      recurringInvestment: 0,
      growthRate: "moderate",
      inflationAdjusted: false
    }
  });

  // Filter cryptocurrencies based on search term
  const filteredCryptos = cryptocurrencies.filter(
    crypto => 
      crypto.name.toLowerCase().includes(cryptoSearch.toLowerCase()) || 
      crypto.symbol.toLowerCase().includes(cryptoSearch.toLowerCase())
  );
  
  return <>
      <div className="flex items-center mb-6">
        <Calculator className="w-5 h-5 mr-2 text-crypto-blue" />
        <h2 className="text-xl font-medium text-slate-50">Investment Details</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="initialInvestment" render={({
          field
        }) => <FormItem className="bg-slate-900">
                <FormLabel className="text-white">Initial Investment (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1000" icon={<span className="text-muted-foreground">$</span>} {...field} />
                </FormControl>
              </FormItem>} />
          
          <FormField control={form.control} name="cryptocurrency" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">Cryptocurrency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <div className="px-3 py-2 sticky top-0 bg-crypto-dark z-10">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search cryptocurrencies..."
                          className="pl-8 text-white"
                          value={cryptoSearch}
                          onChange={(e) => setCryptoSearch(e.target.value)}
                        />
                      </div>
                    </div>
                    {filteredCryptos.length > 0 ? (
                      filteredCryptos.map(crypto => (
                        <SelectItem key={crypto.symbol} value={crypto.symbol}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{
                              backgroundColor: crypto.color
                            }}></div>
                            {crypto.name} ({crypto.symbol})
                          </div>
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                        No cryptocurrencies found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </FormItem>} />
          
          <FormField control={form.control} name="duration" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">Investment Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>} />
          
          <FormField control={form.control} name="recurringInvestment" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">Monthly Contribution (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" icon={<span className="text-muted-foreground">$</span>} {...field} />
                </FormControl>
              </FormItem>} />
          
          <FormField control={form.control} name="growthRate" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">Growth Assumption</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select growth assumption" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>} />
          
          <FormField control={form.control} name="inflationAdjusted" render={({
          field
        }) => <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" checked={field.value} onChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal text-white">
                  Adjust for inflation
                </FormLabel>
              </FormItem>} />
          
          <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-crypto-blue to-crypto-green rounded-md font-medium text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2" disabled={isCalculating}>
            {isCalculating ? <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
                <span>Calculating...</span>
              </> : <>
                <TrendingUp className="w-4 h-4" />
                <span>Calculate Profit</span>
              </>}
          </button>
        </form>
      </Form>
    </>;
};

export default CalculatorForm;
