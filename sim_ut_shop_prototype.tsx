import React, { useState, useEffect } from 'react';

// FUNGSI BANTUAN
// Memformat angka menjadi format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

const initialInventory = [
  { id: 'BRG001', nama: 'Kaos Polo UT', kategori: 'Merchandise', satuan: 'Pcs', hargaBeli: 85000, hargaUmum: 120000, hargaMitra: 100000, stok: 50, supplier: 'Koperasi Karunika' },
  { id: 'BRG002', nama: 'Mug UT', kategori: 'Merchandise', satuan: 'Pcs', hargaBeli: 20000, hargaUmum: 35000, hargaMitra: 25000, stok: 30, supplier: 'Koperasi Karunika' },
  { id: 'BRG003', nama: 'Pop Mie Rasa Ayam', kategori: 'Konsumsi', satuan: 'Cup', hargaBeli: 4000, hargaUmum: 6000, hargaMitra: 5000, stok: 100, supplier: 'Toko Sekitar' },
  { id: 'BRG004', nama: 'Air Mineral 600ml', kategori: 'Konsumsi', satuan: 'Botol', hargaBeli: 2500, hargaUmum: 4000, hargaMitra: 3000, stok: 120, supplier: 'Toko Sekitar' },
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'barang', label: 'Data Barang', icon: '📦' },
    { id: 'kasir', label: 'Kasir (Penjualan)', icon: '🛒' },
    { id: 'pengadaan', label: 'Pengadaan', icon: '📥' },
    { id: 'shu', label: 'Modul SHU', icon: '💰' },
  ];

  return (
    <div className="w-full md:w-64 bg-blue-900 text-white flex flex-col md:min-h-screen shadow-lg">
      <div className="p-6 font-bold text-2xl border-b border-blue-800 text-center md:text-left">
        UT Shop <span className="text-yellow-400">Admin</span>
      </div>
      <nav className="flex-1 flex flex-row md:flex-col overflow-x-auto md:overflow-hidden p-4 gap-2">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => setActiveTab(menu.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors whitespace-nowrap md:whitespace-normal ${
              activeTab === menu.id ? 'bg-blue-700 font-semibold shadow' : 'hover:bg-blue-800'
            }`}
          >
            <span className="text-xl">{menu.icon}</span>
            <span>{menu.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const Dashboard = ({ inventory, transactions }) => {
  const totalBarang = inventory.length;
  const totalStok = inventory.reduce((sum, item) => sum + item.stok, 0);
  const totalPendapatan = transactions.reduce((sum, trx) => sum + trx.total, 0);
  const totalKeuntungan = transactions.reduce((sum, trx) => sum + trx.keuntungan, 0);

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Ringkasan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card Total Barang */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-blue-600 text-2xl">📦</div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Jenis Barang</p>
            <p className="text-2xl font-bold text-gray-800">{totalBarang}</p>
          </div>
        </div>
        
        {/* Card Total Stok */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-green-100 p-4 rounded-lg text-green-600 text-2xl">📊</div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Item Fisik (Stok)</p>
            <p className="text-2xl font-bold text-gray-800">{totalStok}</p>
          </div>
        </div>

        {/* Card Pendapatan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-yellow-100 p-4 rounded-lg text-yellow-600 text-2xl">💰</div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Pendapatan Kotor</p>
            <p className="text-lg font-bold text-gray-800">{formatRupiah(totalPendapatan)}</p>
          </div>
        </div>

        {/* Card Keuntungan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-purple-100 p-4 rounded-lg text-purple-600 text-2xl">📈</div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Estimasi Keuntungan</p>
            <p className="text-lg font-bold text-gray-800">{formatRupiah(totalKeuntungan)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaksi Terakhir</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada transaksi tercatat.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100 text-gray-600">
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Tipe Pembeli</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Metode</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(-5).reverse().map((trx, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-4">{new Date(trx.date).toLocaleString('id-ID')}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${trx.tipePembeli === 'Mitra/SALUT' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                        {trx.tipePembeli}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">{formatRupiah(trx.total)}</td>
                    <td className="py-3 px-4">{trx.metodePembayaran}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const DataBarang = ({ inventory }) => {
  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Master Data Barang</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Tambah Barang
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-sm">
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Nama Barang</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">HPP (Beli)</th>
                <th className="py-3 px-4">Harga Umum</th>
                <th className="py-3 px-4">Harga Mitra</th>
                <th className="py-3 px-4">Stok</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                  <td className="py-3 px-4 font-medium text-blue-600">{item.id}</td>
                  <td className="py-3 px-4 text-gray-800">{item.nama}</td>
                  <td className="py-3 px-4 text-gray-500">{item.kategori}</td>
                  <td className="py-3 px-4 text-gray-800">{formatRupiah(item.hargaBeli)}</td>
                  <td className="py-3 px-4 text-gray-800">{formatRupiah(item.hargaUmum)}</td>
                  <td className="py-3 px-4 text-indigo-600">{formatRupiah(item.hargaMitra)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded font-semibold ${item.stok > 20 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.stok} {item.satuan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Kasir = ({ inventory, setInventory, transactions, setTransactions }) => {
  const [cart, setCart] = useState([]);
  const [tipePembeli, setTipePembeli] = useState('Umum'); // Umum atau Mitra/SALUT
  const [metodePembayaran, setMetodePembayaran] = useState('Cash');

  // Menambahkan barang ke keranjang
  const addToCart = (item) => {
    if (item.stok <= 0) return alert('Stok habis!');
    
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      if (existing.qty >= item.stok) return alert('Melebihi stok tersedia!');
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // Menghitung total harga berdasarkan tipe pembeli
  const calculateItemPrice = (item) => tipePembeli === 'Umum' ? item.hargaUmum : item.hargaMitra;
  
  const totalBelanja = cart.reduce((sum, item) => sum + (calculateItemPrice(item) * item.qty), 0);
  const totalHPP = cart.reduce((sum, item) => sum + (item.hargaBeli * item.qty), 0);
  const totalKeuntungan = totalBelanja - totalHPP;

  // Proses Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;

    // 1. Kurangi stok di inventory
    const updatedInventory = inventory.map(invItem => {
      const cartItem = cart.find(c => c.id === invItem.id);
      if (cartItem) {
        return { ...invItem, stok: invItem.stok - cartItem.qty };
      }
      return invItem;
    });

    // 2. Catat transaksi
    const newTransaction = {
      id: `TRX-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      tipePembeli,
      metodePembayaran,
      total: totalBelanja,
      keuntungan: totalKeuntungan
    };

    setInventory(updatedInventory);
    setTransactions([...transactions, newTransaction]);
    setCart([]); // Kosongkan keranjang
    
    // Custom modal instead of alert for better UI (simplified here via basic state/timeout or just clean UI clear)
    const notification = document.getElementById('success-toast');
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 3000);
  };

  return (
    <div className="p-6 animate-fade-in flex flex-col lg:flex-row gap-6 h-full">
      {/* Kiri: Daftar Barang */}
      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pilih Barang</h2>
        
        {/* Toggle Tipe Pembeli (Penting sesuai proposal) */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Pembeli:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipePembeli" value="Umum" checked={tipePembeli === 'Umum'} onChange={(e) => setTipePembeli(e.target.value)} className="w-4 h-4 text-blue-600" />
              <span>Umum</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="tipePembeli" value="Mitra/SALUT" checked={tipePembeli === 'Mitra/SALUT'} onChange={(e) => setTipePembeli(e.target.value)} className="w-4 h-4 text-blue-600" />
              <span>Mitra / SALUT (Harga Khusus)</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inventory.map((item) => (
            <div key={item.id} onClick={() => addToCart(item)} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all bg-white relative">
              {item.stok <= 0 && <div className="absolute inset-0 bg-white/70 flex items-center justify-center font-bold text-red-600 rounded-lg">Habis</div>}
              <h3 className="font-semibold text-gray-800">{item.nama}</h3>
              <p className="text-xs text-gray-500 mb-2">Stok: {item.stok} {item.satuan}</p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-blue-600">
                  {formatRupiah(tipePembeli === 'Umum' ? item.hargaUmum : item.hargaMitra)}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">HPP: {formatRupiah(item.hargaBeli)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan: Keranjang & Pembayaran */}
      <div className="w-full lg:w-96 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-6rem)] sticky top-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Keranjang</h2>
        
        <div className="flex-1 overflow-y-auto mb-4 border-b border-gray-100 pb-4">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">Keranjang kosong</p>
          ) : (
            <ul className="space-y-3">
              {cart.map((c, idx) => (
                <li key={idx} className="flex justify-between items-start text-sm">
                  <div>
                    <p className="font-semibold text-gray-800">{c.nama}</p>
                    <p className="text-gray-500">{formatRupiah(calculateItemPrice(c))} x {c.qty}</p>
                  </div>
                  <p className="font-bold text-gray-800">{formatRupiah(calculateItemPrice(c) * c.qty)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-gray-800">
            <span>Total Tagihan</span>
            <span className="text-blue-700">{formatRupiah(totalBelanja)}</span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Metode Pembayaran:</label>
            <select value={metodePembayaran} onChange={(e) => setMetodePembayaran(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Cash">Cash (Tunai)</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="QRIS">QRIS</option>
            </select>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${cart.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 shadow-lg'}`}
          >
            Selesaikan Pembayaran
          </button>
        </div>
        
        {/* Toast Notification Element */}
        <div id="success-toast" className="hidden absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg text-sm transition-opacity">
          Transaksi Berhasil! Stok diperbarui.
        </div>
      </div>
    </div>
  );
};

const Pengadaan = () => {
  return (
    <div className="p-6 animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-blue-50 p-6 rounded-full mb-4">
        <span className="text-4xl">📥</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Modul Pengadaan Barang</h2>
      <p className="text-gray-600 max-w-md">
        Sesuai proposal, modul ini nantinya akan menangani 2 tipe pengadaan: <br/>
        <strong>1. Pemesanan ke Koperasi Karunika (Merchandise)</strong><br/>
        <strong>2. Pembelian Langsung (Toko Sekitar)</strong>
      </p>
      <p className="text-sm text-gray-400 mt-6 border-t border-gray-200 pt-4">Tampilan Form Input Pengadaan sedang dalam tahap pengembangan (WIP).</p>
    </div>
  );
};

const SHU = ({ transactions }) => {
  const totalKeuntungan = transactions.reduce((sum, trx) => sum + trx.keuntungan, 0);
  const persentasePihakUT = 70; // Contoh statis, sesuai proposal akan dinamis
  const persentasePengelola = 30;

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Simulasi Pembagian SHU</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <div className="mb-6 pb-6 border-b border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total Keuntungan Bersih (Dari Transaksi Saat Ini)</p>
          <p className="text-3xl font-bold text-green-600">{formatRupiah(totalKeuntungan)}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-700">Skema Pembagian (Konfigurasi)</h3>
          
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-bold text-gray-800">Pihak UT</p>
              <p className="text-xs text-gray-500">Porsi {persentasePihakUT}%</p>
            </div>
            <p className="font-bold text-blue-700 text-lg">
              {formatRupiah(totalKeuntungan * (persentasePihakUT/100))}
            </p>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-bold text-gray-800">Pengelola / UT Shop</p>
              <p className="text-xs text-gray-500">Porsi {persentasePengelola}%</p>
            </div>
            <p className="font-bold text-blue-700 text-lg">
              {formatRupiah(totalKeuntungan * (persentasePengelola/100))}
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded-r-lg">
          <strong>Catatan (Sesuai Proposal):</strong> Persentase SHU di atas hanya simulasi. Persentase final dan rumus resmi harus dikonfirmasi langsung oleh pihak UT sebelum diimplementasikan secara operasional.
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // State Utama Aplikasi
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState(initialInventory);
  const [transactions, setTransactions] = useState([]);

  // Render konten berdasarkan tab aktif
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard inventory={inventory} transactions={transactions} />;
      case 'barang':
        return <DataBarang inventory={inventory} />;
      case 'kasir':
        return <Kasir inventory={inventory} setInventory={setInventory} transactions={transactions} setTransactions={setTransactions} />;
      case 'pengadaan':
        return <Pengadaan />;
      case 'shu':
        return <SHU transactions={transactions} />;
      default:
        return <Dashboard inventory={inventory} transactions={transactions} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row">
      {/* Sidebar untuk Navigasi */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Area Konten Utama */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Header Mobile / Info Top */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800 hidden md:block">Sistem Informasi Manajemen UT Shop</h1>
          <h1 className="text-lg font-bold text-gray-800 md:hidden">SIM UT Shop</h1>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800">Admin Utama</p>
              <p className="text-xs text-gray-500">admin@utshop.com</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        {/* Konten Halaman Dinamis */}
        <div className="relative">
          {renderContent()}
        </div>
      </main>

      {/* Global Style untuk Animasi Transisi Halaman */}
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}