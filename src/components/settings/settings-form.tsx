'use client';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { AppSettings, Employee } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SettingsFormProps = {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
};

export function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [whatsappTemplate, setWhatsappTemplate] = useState(
    settings.whatsappTemplate
  );
  const [employees, setEmployees] = useState(settings.employees);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const { toast } = useToast();


  const handleSave = () => {
    onSave({ logoUrl, whatsappTemplate, employees });
    toast({
        title: "Settings Saved",
        description: "Your changes have been successfully saved.",
    });
  };
  
  const addEmployee = () => {
    if (newEmployeeName.trim()) {
        const newEmployee: Employee = { id: Date.now().toString(), name: newEmployeeName.trim() };
        setEmployees([...employees, newEmployee]);
        setNewEmployeeName('');
    }
  }

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">General Settings</CardTitle>
              <CardDescription>
                Manage company logo and branding.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">Company Logo URL</Label>
                <Input
                  id="logoUrl"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Logo Preview</Label>
                <div className="flex h-24 w-24 items-center justify-center rounded-md border">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="Logo Preview"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">No Logo</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messaging">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Messaging</CardTitle>
              <CardDescription>
                Customize automated WhatsApp messages. Use {'{customerName}'} as a placeholder.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="whatsappTemplate">WhatsApp Template</Label>
              <Textarea
                id="whatsappTemplate"
                value={whatsappTemplate}
                onChange={(e) => setWhatsappTemplate(e.target.value)}
                rows={5}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Employee Management</CardTitle>
              <CardDescription>
                Add or remove employees who can be assigned to calls.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input value={newEmployeeName} onChange={e => setNewEmployeeName(e.target.value)} placeholder="New employee name"/>
                    <Button onClick={addEmployee}>Add</Button>
                </div>
                <div className="space-y-2 rounded-md border p-2">
                    {employees.map(employee => (
                        <div key={employee.id} className="flex items-center justify-between rounded-md p-2 hover:bg-secondary">
                           <span>{employee.name}</span>
                           <Button variant="ghost" size="icon" onClick={() => removeEmployee(employee.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
