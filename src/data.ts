import { Gauge, ShieldCheck, PackageCheck, Wrench, RotateCcw, Activity } from 'lucide-react';
export const features = [
 {icon:Gauge,title:'Responsive by default',text:'Tune Windows services, power behavior, networking, and UI latency from one guided workspace.'},
 {icon:ShieldCheck,title:'Privacy you can inspect',text:'See what each change affects before it runs. Risk labels and plain-language notes keep you in control.'},
 {icon:PackageCheck,title:'55 apps, one queue',text:'Pick browsers, media tools, launchers, developer software, and essentials—then install in one pass.'},
 {icon:Wrench,title:'34 specialist tools',text:'Launch trusted diagnostics, driver utilities, benchmarks, and GPU tools without hunting for downloads.'},
 {icon:RotateCcw,title:'Built to roll back',text:'Restore-point reminders, change history, and reversal guidance make experimentation less stressful.'},
 {icon:Activity,title:'Hardware-aware plans',text:'Recommendations adapt to storage, GPU, memory, network, and laptop or desktop hardware.'}
];
export const catalog = {
 'System':['Privacy controls','Power plan','Network latency','Explorer cleanup','Gaming services','Telemetry','Storage cleanup','Visual effects'],
 'Apps':['Chrome','Firefox','Brave','Spotify','VLC','Discord','7-Zip','VS Code','Steam','OBS Studio','Everything','Visual C++'],
 'Tools':['HWiNFO','CPU-Z','GPU-Z','CrystalDiskInfo','DDU','NVCleanstall','OCCT','CapFrameX','Rufus','Autoruns','TCP Optimizer','ThrottleStop']
};
