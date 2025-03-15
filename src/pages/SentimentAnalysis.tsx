import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { SentimentHeader } from '@/components/sentiment/SentimentHeader';
import { SentimentOverviewCard } from '@/components/sentiment/SentimentOverviewCard';
import { SentimentTrendChart } from '@/components/sentiment/SentimentTrendChart';
import { TopICOsList } from '@/components/sentiment/TopICOsList';
import { KeywordCloud } from '@/components/sentiment/KeywordCloud';
import { RiskAlerts } from '@/components/sentiment/RiskAlerts';
import { ICODetailsDialog } from '@/components/sentiment/ICODetailsDialog';
import { AlertsSignupDialog, AlertSubscription } from '@/components/sentiment/AlertsSignupDialog';
import { SentimentFilters } from '@/types/sentiment';
import { useSentimentOverview, useICOSentiment } from '@/services/sentimentService';
import { toast } from 'sonner';

const SentimentAnalysis = () => {
  // Filter state
  const [filters, setFilters] = useState<SentimentFilters>({
    timeRange: '7d',
    platforms: ['twitter', 'reddit', 'telegram', 'news'],
    searchTerm: '',
  });

  // Dialogs state
  const [selectedICO, setSelectedICO] = useState<string | null>(null);
  const [isAlertsDialogOpen, setIsAlertsDialogOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Data queries
  const { 
    data: sentimentData, 
    isLoading: isLoadingSentiment 
  } = useSentimentOverview(filters);
  
  const { 
    data: icoDetails, 
    isLoading: isLoadingICO 
  } = useICOSentiment(selectedICO || '');

  // Handlers
  const handleViewICODetails = (icoId: string) => {
    setSelectedICO(icoId);
  };

  const handleCloseICODetails = () => {
    setSelectedICO(null);
  };

  const handleOpenAlertsDialog = () => {
    setIsAlertsDialogOpen(true);
  };

  const handleCloseAlertsDialog = () => {
    setIsAlertsDialogOpen(false);
  };

  const handleSubscribeAlerts = (subscription: AlertSubscription) => {
    console.log('Subscribing to alerts:', subscription);
    setIsSubscribed(true);
    toast.success('Successfully subscribed to alerts!');
  };

  const handleKeywordClick = (keyword: string) => {
    setFilters({
      ...filters,
      searchTerm: keyword,
    });
    
    toast.info(`Filtering by keyword: ${keyword}`);
  };

  return (
    <DashboardLayout>
      <div className="container max-w-screen-xl mx-auto py-6 space-y-6">
        <SentimentHeader 
          filters={filters} 
          setFilters={setFilters} 
          isSubscribed={isSubscribed}
          onSubscribeAlerts={handleOpenAlertsDialog}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overview Card */}
          <SentimentOverviewCard 
            data={sentimentData || { 
              totalMentions: 0,
              averageSentiment: 0,
              topICOs: [],
              sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
              platformDistribution: { twitter: 0, reddit: 0, telegram: 0, news: 0 },
              recentTrends: [],
              trendingKeywords: [],
              riskAlerts: []
            }} 
            isLoading={isLoadingSentiment} 
          />
          
          {/* Trend Chart */}
          <SentimentTrendChart 
            data={sentimentData || {
              totalMentions: 0,
              averageSentiment: 0,
              topICOs: [],
              sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
              platformDistribution: { twitter: 0, reddit: 0, telegram: 0, news: 0 },
              recentTrends: [],
              trendingKeywords: [],
              riskAlerts: []
            }} 
            isLoading={isLoadingSentiment} 
          />
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Top ICOs */}
          <div className="md:col-span-2">
            <TopICOsList 
              icos={sentimentData?.topICOs || []} 
              isLoading={isLoadingSentiment}
              onViewDetails={handleViewICODetails}
            />
          </div>
          
          {/* Keyword Cloud */}
          <div>
            <KeywordCloud 
              data={sentimentData || {
                totalMentions: 0,
                averageSentiment: 0,
                topICOs: [],
                sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
                platformDistribution: { twitter: 0, reddit: 0, telegram: 0, news: 0 },
                recentTrends: [],
                trendingKeywords: [],
                riskAlerts: []
              }} 
              isLoading={isLoadingSentiment}
              onKeywordClick={handleKeywordClick}
            />
          </div>
        </div>
        
        {/* Risk Alerts */}
        <RiskAlerts 
          data={sentimentData || {
            totalMentions: 0,
            averageSentiment: 0,
            topICOs: [],
            sentimentDistribution: { positive: 0, neutral: 0, negative: 0 },
            platformDistribution: { twitter: 0, reddit: 0, telegram: 0, news: 0 },
            recentTrends: [],
            trendingKeywords: [],
            riskAlerts: []
          }} 
          isLoading={isLoadingSentiment}
        />
        
        {/* Dialogs */}
        <ICODetailsDialog 
          ico={icoDetails || null} 
          isOpen={!!selectedICO} 
          onClose={handleCloseICODetails} 
        />
        
        <AlertsSignupDialog 
          isOpen={isAlertsDialogOpen} 
          onClose={handleCloseAlertsDialog}
          onSubscribe={handleSubscribeAlerts}
        />
      </div>
    </DashboardLayout>
  );
};

export default SentimentAnalysis;
