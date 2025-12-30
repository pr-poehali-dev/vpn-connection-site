import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState('США');
  const [currentTab, setCurrentTab] = useState('main');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  const servers = [
    { name: 'США', location: 'Нью-Йорк', ping: 45, flag: '🇺🇸' },
    { name: 'Германия', location: 'Берлин', ping: 28, flag: '🇩🇪' },
    { name: 'Япония', location: 'Токио', ping: 120, flag: '🇯🇵' },
    { name: 'Великобритания', location: 'Лондон', ping: 38, flag: '🇬🇧' },
    { name: 'Франция', location: 'Париж', ping: 32, flag: '🇫🇷' },
    { name: 'Канада', location: 'Торонто', ping: 55, flag: '🇨🇦' },
  ];

  const stats = {
    downloadSpeed: isConnected ? '45.3' : '0',
    uploadSpeed: isConnected ? '12.8' : '0',
    ping: isConnected ? servers.find(s => s.name === selectedServer)?.ping || 45 : 0,
    dataUsed: '2.4 ГБ',
  };

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://cdn.poehali.dev/files/5fbe9ca0dbb100822e681ce3ad7da1e1.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />
      
      <div className="container max-w-md mx-auto px-4 py-6 relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            SkyWorld
          </h1>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-800">
                <Icon name="Settings" size={32} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-900/95 backdrop-blur-md border-slate-800">
              <SheetHeader>
                <SheetTitle className="text-white">Меню</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                <Button variant="ghost" className="w-full justify-start text-lg" onClick={() => {}}>
                  <Icon name="LogIn" className="mr-3" size={20} />
                  Авторизация
                </Button>
                <Button variant="ghost" className="w-full justify-start text-lg" onClick={() => {}}>
                  <Icon name="Settings" className="mr-3" size={20} />
                  Настройки
                </Button>
                <Button variant="ghost" className="w-full justify-start text-lg" onClick={() => {}}>
                  <Icon name="CreditCard" className="mr-3" size={20} />
                  Подписка
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/70 backdrop-blur-md mb-8">
            <TabsTrigger value="main" className="data-[state=active]:bg-slate-700">
              Главная
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-slate-700">
              Серверы
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700">
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="main" className="space-y-8">
            <div className="relative flex flex-col items-center justify-center py-8">
              <div className="relative w-80 h-80 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
                
                <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex items-center justify-center animate-spin-slow">
                  <div className="absolute inset-4 rounded-full bg-slate-900 flex items-center justify-center">
                    <div className="text-8xl">🌍</div>
                  </div>
                  {isConnected && (
                    <div className="absolute top-8 right-8 text-4xl animate-in zoom-in duration-500">
                      🚩
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  onClick={() => setIsConnected(!isConnected)}
                  className={`absolute -top-12 px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 ${
                    isConnected
                      ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/50'
                      : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50'
                  }`}
                >
                  {isConnected ? 'Отключиться' : 'Подключиться'}
                </Button>
              </div>

              {showNotification && (
                <div className="absolute top-32 text-center animate-in fade-in slide-in-from-top-4 duration-500">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 px-4 py-2 text-base">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                    Подключено к {selectedServer}
                  </Badge>
                </div>
              )}
            </div>

            <Card className="bg-slate-800/70 backdrop-blur-md border-slate-700 p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Сервер</span>
                  <span className="font-semibold">{selectedServer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">IP Адрес</span>
                  <span className="font-mono text-sm">{isConnected ? '185.162.123.45' : '---'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Протокол</span>
                  <span className="text-sm">OpenVPN</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="servers" className="space-y-4">
            {servers.map((server) => (
              <Card
                key={server.name}
                className={`bg-slate-800/70 backdrop-blur-md border-slate-700 p-4 cursor-pointer transition-all hover:bg-slate-800 ${
                  selectedServer === server.name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedServer(server.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{server.flag}</span>
                    <div>
                      <h3 className="font-semibold">{server.name}</h3>
                      <p className="text-sm text-slate-400">{server.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Пинг</div>
                      <div className="font-semibold text-emerald-400">{server.ping} мс</div>
                    </div>
                    <Icon 
                      name={selectedServer === server.name ? 'CheckCircle2' : 'Circle'} 
                      size={24}
                      className={selectedServer === server.name ? 'text-blue-500' : 'text-slate-600'}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <Card className="bg-slate-800/70 backdrop-blur-md border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Download" size={20} className="text-blue-400" />
                Скорость загрузки
              </h3>
              <div className="text-4xl font-bold text-blue-400">
                {stats.downloadSpeed} <span className="text-xl text-slate-400">Мбит/с</span>
              </div>
            </Card>

            <Card className="bg-slate-800/70 backdrop-blur-md border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Upload" size={20} className="text-emerald-400" />
                Скорость отдачи
              </h3>
              <div className="text-4xl font-bold text-emerald-400">
                {stats.uploadSpeed} <span className="text-xl text-slate-400">Мбит/с</span>
              </div>
            </Card>

            <Card className="bg-slate-800/70 backdrop-blur-md border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Activity" size={20} className="text-purple-400" />
                Пинг
              </h3>
              <div className="text-4xl font-bold text-purple-400">
                {stats.ping} <span className="text-xl text-slate-400">мс</span>
              </div>
            </Card>

            <Card className="bg-slate-800/70 backdrop-blur-md border-slate-700 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="HardDrive" size={20} className="text-orange-400" />
                Использовано данных
              </h3>
              <div className="text-4xl font-bold text-orange-400">{stats.dataUsed}</div>
              <div className="mt-4 w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <p className="text-sm text-slate-400 mt-2">из 10 ГБ в этом месяце</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;