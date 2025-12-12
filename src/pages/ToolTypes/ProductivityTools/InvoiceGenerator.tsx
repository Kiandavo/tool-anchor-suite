import React, { useState, useRef } from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { VisualizationCard } from '@/components/calculator/VisualizationCard';
import { FileText, Plus, Trash2, Download, Copy, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerAddress: string;
  items: InvoiceItem[];
  notes: string;
  taxRate: number;
}

const defaultInvoice: InvoiceData = {
  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  sellerName: '',
  sellerAddress: '',
  buyerName: '',
  buyerAddress: '',
  items: [{ id: '1', description: '', quantity: 1, unitPrice: 0 }],
  notes: '',
  taxRate: 9,
};

const InvoiceGenerator: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(defaultInvoice);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoice({ ...invoice, [field]: value });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) return;
    setInvoice({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id),
    });
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = subtotal * (invoice.taxRate / 100);
  const total = subtotal + tax;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const printInvoice = () => {
    const printContent = invoiceRef.current?.innerHTML;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <title>فاکتور ${invoice.invoiceNumber}</title>
        <style>
          body { font-family: Tahoma, Arial; padding: 40px; }
          .invoice-header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .invoice-title { font-size: 28px; font-weight: bold; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: right; border-bottom: 1px solid #ddd; }
          th { background: #f5f5f5; }
          .total-row { font-weight: bold; font-size: 18px; }
          .notes { margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 8px; }
        </style>
      </head>
      <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const reset = () => {
    setInvoice({
      ...defaultInvoice,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  return (
    <div className="space-y-6">
      <CalculatorCard title="ساخت فاکتور" icon={FileText} onReset={reset}>
        {/* Invoice Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>شماره فاکتور</Label>
            <Input
              value={invoice.invoiceNumber}
              onChange={(e) => updateField('invoiceNumber', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>تاریخ صدور</Label>
            <Input
              type="date"
              value={invoice.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>تاریخ سررسید</Label>
            <Input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateField('dueDate', e.target.value)}
            />
          </div>
        </div>

        {/* Seller & Buyer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3 p-4 bg-muted/30 rounded-xl">
            <h3 className="font-medium">فروشنده</h3>
            <Input
              placeholder="نام فروشنده"
              value={invoice.sellerName}
              onChange={(e) => updateField('sellerName', e.target.value)}
            />
            <Textarea
              placeholder="آدرس فروشنده"
              value={invoice.sellerAddress}
              onChange={(e) => updateField('sellerAddress', e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-3 p-4 bg-muted/30 rounded-xl">
            <h3 className="font-medium">خریدار</h3>
            <Input
              placeholder="نام خریدار"
              value={invoice.buyerName}
              onChange={(e) => updateField('buyerName', e.target.value)}
            />
            <Textarea
              placeholder="آدرس خریدار"
              value={invoice.buyerAddress}
              onChange={(e) => updateField('buyerAddress', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Items */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">اقلام</h3>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 ml-1" />
              ردیف جدید
            </Button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[1fr,80px,100px,40px] gap-2 text-sm text-muted-foreground px-2">
              <span>شرح</span>
              <span>تعداد</span>
              <span>قیمت واحد</span>
              <span></span>
            </div>

            {invoice.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-[1fr,80px,100px,40px] gap-2"
              >
                <Input
                  placeholder="شرح کالا یا خدمات"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                />
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                />
                <Input
                  type="number"
                  min="0"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, 'unitPrice', parseInt(e.target.value) || 0)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  disabled={invoice.items.length <= 1}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tax & Notes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>نرخ مالیات (%)</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={invoice.taxRate}
              onChange={(e) => updateField('taxRate', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label>یادداشت</Label>
            <Textarea
              placeholder="توضیحات اضافی..."
              value={invoice.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Totals */}
        <div className="p-4 bg-primary/5 rounded-xl space-y-2 text-left" dir="ltr">
          <div className="flex justify-between">
            <span className="text-muted-foreground">جمع کل:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">مالیات ({invoice.taxRate}%):</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>مبلغ نهایی:</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={printInvoice} className="flex-1 gap-2">
            <Printer className="h-4 w-4" />
            چاپ فاکتور
          </Button>
        </div>
      </CalculatorCard>

      {/* Preview */}
      <VisualizationCard title="پیش‌نمایش فاکتور">
        <div ref={invoiceRef} className="p-6 bg-white rounded-xl border" dir="rtl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">فاکتور</h1>
              <p className="text-muted-foreground">شماره: {invoice.invoiceNumber}</p>
            </div>
            <div className="text-left text-sm text-muted-foreground">
              <p>تاریخ: {formatDate(invoice.date)}</p>
              <p>سررسید: {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-medium mb-2">فروشنده:</h3>
              <p className="font-bold">{invoice.sellerName || '-'}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.sellerAddress}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">خریدار:</h3>
              <p className="font-bold">{invoice.buyerName || '-'}</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.buyerAddress}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2">
                <th className="text-right py-2">ردیف</th>
                <th className="text-right py-2">شرح</th>
                <th className="text-center py-2">تعداد</th>
                <th className="text-left py-2">قیمت واحد</th>
                <th className="text-left py-2">جمع</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{item.description || '-'}</td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-left">{formatCurrency(item.unitPrice)}</td>
                  <td className="py-2 text-left">{formatCurrency(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>جمع کل:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>مالیات ({invoice.taxRate}%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>مبلغ نهایی:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">یادداشت:</h4>
              <p className="text-sm whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
      </VisualizationCard>
    </div>
  );
};

export default InvoiceGenerator;
