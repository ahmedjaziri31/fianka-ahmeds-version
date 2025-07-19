'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mail, Calendar, Search, Download, Users } from 'lucide-react';

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
  promoCodeUsed?: string;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    const filtered = subscribers.filter(subscriber =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubscribers(filtered);
  }, [subscribers, searchTerm]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/newsletter');
      const data = await response.json();
      setSubscribers(data.subscribers || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Email', 'Subscribed Date', 'Status', 'Promo Code Used'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        formatDate(sub.subscribedAt),
        sub.isActive ? 'Active' : 'Inactive',
        sub.promoCodeUsed || 'None'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const activeSubscribers = subscribers.filter(sub => sub.isActive);
  const recentSubscribers = subscribers.filter(sub => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(sub.subscribedAt) > weekAgo;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-gray-600 mt-2">Manage your email newsletter subscribers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Subscribers
            </CardTitle>
            <Mail className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscribers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              This Week
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentSubscribers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Export */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Subscriber List</CardTitle>
            <Button onClick={handleExportCSV} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg">Loading subscribers...</div>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No subscribers found' : 'No subscribers yet'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Newsletter subscribers will appear here once they sign up.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Subscribed Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Promo Code</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          {subscriber.email}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {formatDate(subscriber.subscribedAt)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            subscriber.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {subscriber.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {subscriber.promoCodeUsed ? (
                          <Badge className="bg-blue-100 text-blue-800">
                            {subscriber.promoCodeUsed}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination info */}
          {filteredSubscribers.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredSubscribers.length} of {subscribers.length} subscribers
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentSubscribers.length === 0 ? (
            <p className="text-gray-600">No new subscriptions this week.</p>
          ) : (
            <div className="space-y-3">
              {recentSubscribers.slice(0, 5).map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">{subscriber.email}</div>
                      <div className="text-sm text-gray-600">
                        {formatDate(subscriber.subscribedAt)}
                      </div>
                    </div>
                  </div>
                  {subscriber.promoCodeUsed && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {subscriber.promoCodeUsed}
                    </Badge>
                  )}
                </div>
              ))}
              {recentSubscribers.length > 5 && (
                <p className="text-sm text-gray-600 pt-2">
                  And {recentSubscribers.length - 5} more this week...
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 