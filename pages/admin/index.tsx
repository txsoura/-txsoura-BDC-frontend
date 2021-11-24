import { withNavBarLayout } from 'components/withNavBarLayout';
import DashboardCard from 'components/DashboardCard';
import DashboardCardWithLineChart from 'components/DashboardCard/withLineChart';
import DashboardCardBarChart from 'components/DashboardCard/barChart';
import { routeRole } from 'components/routeRole';

const Index = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard />
        <DashboardCardWithLineChart />
        <DashboardCardBarChart />
      </div>
    </div>
  );
};

export default routeRole(withNavBarLayout(Index), 'admin');
