'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Mail, TrendingUp, Users, Eye } from 'lucide-react';
import Link from 'next/link';

interface AdminStats {
  totalOrders: number;
  totalNewsletterSubs: number;
  recentOrders: number;
  recentSubs: number;
}

interface RecentOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  itemCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalNewsletterSubs: 0,
    recentOrders: 0,
    recentSubs: 0
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch orders stats
        const ordersResponse = await fetch('/api/admin/orders/stats');
        const ordersData = await ordersResponse.json();
        
        // Fetch newsletter stats
        const newsletterResponse = await fetch('/api/admin/newsletter/stats');
        const newsletterData = await newsletterResponse.json();
        
        // Fetch recent orders
        const recentOrdersResponse = await fetch('/api/admin/orders');
        const recentOrdersData = await recentOrdersResponse.json();
        
        setStats({
          totalOrders: ordersData.total || 0,
          totalNewsletterSubs: newsletterData.total || 0,
          recentOrders: ordersData.recent || 0,
          recentSubs: newsletterData.recent || 0
        });
        
        // Get the 5 most recent orders
        const recent = (recentOrdersData.orders || []).slice(0, 5).map((order: any) => ({
          id: order.id,
          customerName: order.customerName,
          customerEmail: order.customerEmail,
          total: order.total,
          status: order.status,
          createdAt: order.createdAt,
          itemCount: order.items.length
        }));
        
        setRecentOrders(recent);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.totalNewsletterSubs,
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Recent Orders (7 days)',
      value: stats.recentOrders,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'New Subscribers (7 days)',
      value: stats.recentSubs,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)}dt`;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your store's performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="/admin/orders"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">View All Orders</h3>
                  <p className="text-sm text-gray-600">Manage customer orders</p>
                </div>
              </div>
            </Link>
            
            <Link
              href="/admin/newsletter"
              className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <h3 className="font-medium">Newsletter Subscribers</h3>
                  <p className="text-sm text-gray-600">Manage email subscribers</p>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">
                  {stats.recentOrders} new orders this week
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">
                  {stats.recentSubs} new subscribers this week
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <Link 
              href="/admin/orders"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View All →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg">Loading orders...</div>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600">Orders will appear here once customers start placing them.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Order #{order.id.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.customerName} • {order.itemCount} item{order.itemCount !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(order.total)}
                      </div>
                    </div>
                    <Link 
                      href="/admin/orders"
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 