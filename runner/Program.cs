using System.Diagnostics;
using System.Security.Principal;
using System.Text;
using System.Text.Json;

record Tweak(string name, string apply, string undo);
record Plan(Tweak[] tweaks);
class Program {
  const string Marker = "\n--APEX-TWEAKS-PLAN-V1--\n";
  static int Main() {
    Console.Title = "Apex Tweaks Runner";
    try {
      var plan = ReadPlan();
      if (!IsAdmin()) { Console.WriteLine("Administrator permission is required. Opening the secure Windows prompt..."); RelaunchElevated(); return 0; }
      Header();
      Console.WriteLine($"Plan contains {plan.tweaks.Length} change(s):\n");
      foreach (var item in plan.tweaks) Console.WriteLine($"  • {item.name}");
      Console.WriteLine("\n[A] Apply plan   [R] Roll back plan   [Q] Quit");
      var key = Console.ReadKey(true).Key;
      if (key == ConsoleKey.Q) return 0;
      if (key is not (ConsoleKey.A or ConsoleKey.R)) { Console.WriteLine("Invalid choice. Nothing was changed."); return 1; }
      var rollback = key == ConsoleKey.R;
      if (!rollback) RunPowerShell("Enable-ComputerRestore -Drive $env:SystemDrive -ErrorAction SilentlyContinue; Checkpoint-Computer -Description 'Before Apex Tweaks' -RestorePointType MODIFY_SETTINGS -ErrorAction SilentlyContinue");
      var log = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), $"ApexTweaks-{DateTime.Now:yyyyMMdd-HHmmss}.log");
      using var writer = new StreamWriter(log, true, Encoding.UTF8);
      foreach (var item in plan.tweaks) {
        Console.Write($"{(rollback ? "Reverting" : "Applying")} {item.name}... ");
        var (code, output) = RunPowerShell(rollback ? item.undo : item.apply);
        writer.WriteLine($"[{DateTime.Now:O}] {item.name}\n{output}");
        Console.ForegroundColor = code == 0 ? ConsoleColor.Green : ConsoleColor.Red;
        Console.WriteLine(code == 0 ? "Done" : "Failed"); Console.ResetColor();
      }
      Console.WriteLine($"\nFinished. Log saved to:\n{log}\n\nPress any key to close."); Console.ReadKey(true); return 0;
    } catch (Exception ex) { Console.ForegroundColor=ConsoleColor.Red; Console.WriteLine($"Apex Runner could not continue: {ex.Message}\nNo further changes were made.\nPress any key to close."); Console.ResetColor(); Console.ReadKey(true); return 1; }
  }
  static Plan ReadPlan() { var bytes=File.ReadAllBytes(Environment.ProcessPath!); var marker=Encoding.UTF8.GetBytes(Marker); var at=LastIndexOf(bytes,marker); if(at<0) throw new InvalidOperationException("This runner does not contain a tweak plan. Download it again from Apex Tweaks."); var json=Encoding.UTF8.GetString(bytes,at+marker.Length,bytes.Length-at-marker.Length); return JsonSerializer.Deserialize<Plan>(json,new JsonSerializerOptions{PropertyNameCaseInsensitive=true}) ?? throw new InvalidOperationException("The embedded plan is invalid."); }
  static int LastIndexOf(byte[] source,byte[] value) { for(var i=source.Length-value.Length;i>=0;i--){var ok=true;for(var j=0;j<value.Length;j++)if(source[i+j]!=value[j]){ok=false;break;}if(ok)return i;}return -1; }
  static bool IsAdmin()=>new WindowsPrincipal(WindowsIdentity.GetCurrent()).IsInRole(WindowsBuiltInRole.Administrator);
  static void RelaunchElevated()=>Process.Start(new ProcessStartInfo(Environment.ProcessPath!){UseShellExecute=true,Verb="runas"});
  static (int,string) RunPowerShell(string command) { var info=new ProcessStartInfo("powershell.exe",$"-NoLogo -NoProfile -NonInteractive -ExecutionPolicy Bypass -Command \"{command.Replace("\"","\\\"")}\""){UseShellExecute=false,RedirectStandardOutput=true,RedirectStandardError=true,CreateNoWindow=true}; using var process=Process.Start(info)!; var output=process.StandardOutput.ReadToEnd()+process.StandardError.ReadToEnd();process.WaitForExit();return(process.ExitCode,output); }
  static void Header(){Console.ForegroundColor=ConsoleColor.Red;Console.WriteLine("╔══════════════════════════════════════╗\n║          APEX TWEAKS RUNNER          ║\n╚══════════════════════════════════════╝");Console.ResetColor();Console.WriteLine("Review first. Stay in control.\n");}
}
