import React from "react";
import { Calculator, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, formSchema } from "./utils/calculationUtils";
import { cryptocurrencies } from "./utils/constants";
interface CalculatorFormProps {
  onSubmit: (values: FormValues) => void;
  isCalculating: boolean;
}
const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onSubmit,
  isCalculating
}) => {
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
                <FormLabel>Initial Investment (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1000" icon={<span className="text-muted-foreground">$</span>} {...field} />
                </FormControl>
              </FormItem>} />
          
          <FormField control={form.control} name="cryptocurrency" render={({
          field
        }) => <FormItem>
                <FormLabel>Cryptocurrency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cryptocurrencies.map(crypto => <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{
                    backgroundColor: crypto.color
                  }}></div>
                          {crypto.name} ({crypto.symbol})
                        </div>
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </FormItem>} />
          
          <FormField control={form.control} name="duration" render={({
          field
        }) => <FormItem>
                <FormLabel>Investment Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>} />
          
          <FormField control={form.control} name="recurringInvestment" render={({
          field
        }) => <FormItem>
                <FormLabel>Monthly Contribution (USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" icon={<span className="text-muted-foreground">$</span>} {...field} />
                </FormControl>
              </FormItem>} />
          
          <FormField control={form.control} name="growthRate" render={({
          field
        }) => <FormItem>
                <FormLabel>Growth Assumption</FormLabel>
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
                <FormLabel className="text-sm font-normal">
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