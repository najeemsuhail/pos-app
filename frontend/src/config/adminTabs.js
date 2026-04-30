import ReportsTab from '../components/admin/ReportsTab';
import OrderHistoryTab from '../components/admin/OrderHistoryTab';
import MenuManagementTab from '../components/admin/MenuManagementTab';
import CategoryManagementTab from '../components/admin/CategoryManagementTab';
import ExpenseManagementTab from '../components/admin/ExpenseManagementTab';
import AttendanceManagementTab from '../components/admin/AttendanceManagementTab';
import PurchaseManagementTab from '../components/admin/PurchaseManagementTab';
import IngredientsManagementTab from '../components/admin/IngredientsManagementTab';
import UserManagementTab from '../components/admin/UserManagementTab';
import BackupTab from '../components/admin/BackupTab';
import SettingsTab from '../components/admin/SettingsTab';

export const adminTabs = [
  { key: 'reports', label: 'Reports', Component: ReportsTab, enabled: true },
  { key: 'orders', label: 'Order History', Component: OrderHistoryTab, enabled: true },
  { key: 'menu', label: 'Menu Items', Component: MenuManagementTab, enabled: true },
  { key: 'categories', label: 'Categories', Component: CategoryManagementTab, enabled: true },
  { key: 'expenses', label: 'Operating Expenses', Component: ExpenseManagementTab, enabled: true },
  { key: 'attendance', label: 'Staff Attendance', Component: AttendanceManagementTab, enabled: false },
  { key: 'ingredients', label: 'Ingredients', Component: IngredientsManagementTab, enabled: false },
  { key: 'purchases', label: 'Purchases', Component: PurchaseManagementTab, enabled: true },
  { key: 'users', label: 'Users', Component: UserManagementTab, enabled: true },
  { key: 'backup', label: 'Backup', Component: BackupTab, enabled: true },
  { key: 'settings', label: 'Settings', Component: SettingsTab, enabled: true },
];

export const getVisibleAdminTabs = () => adminTabs.filter((tab) => tab.enabled);
