// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


use pv_recorder::PvRecorderBuilder;
use tauri::{AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem, WindowBuilder};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

const TRAY_MENU_QUIT: &str = "quit";
const TRAY_MENU_SETTING: &str = "setting";

fn toggle_window(app: &AppHandle) {
  if let Some(win) = app.get_window("setting") {
    if let Ok(vis) = win.is_visible() {
      if vis == false {
        win.show().unwrap();
      }
    }
    win.set_focus().unwrap();
    return;
  }
  let setting_window = WindowBuilder::new(app, "setting", tauri::WindowUrl::App("index.html".into())).build().unwrap();
  
  setting_window.set_title("VoiceToys - 设置").unwrap();
  setting_window.show().unwrap();
  setting_window.set_focus().unwrap();
  
}


fn main() {
  let quit = CustomMenuItem::new(TRAY_MENU_QUIT, "退出");
  let setting = CustomMenuItem::new(TRAY_MENU_SETTING, "设置");

  let tray_menu = SystemTrayMenu::new()
    .add_item(setting)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);
  let tray = SystemTray::new().with_menu(tray_menu).with_tooltip("VoiceToys - 语音AI助手");
  tauri::Builder::default()
    .setup(|_| {
      tauri::async_runtime::spawn(async move {
        let recorder = PvRecorderBuilder::new(512).init().unwrap();
        recorder.start().unwrap();
        println!("starting record audio...");
        while recorder.is_recording() {
          let frame = recorder.read().unwrap();
          println!("GOT FRAME: {:?}", frame);
        }
      });
      Ok(())
    })
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::LeftClick { .. } => {
        toggle_window(app);
      }
      SystemTrayEvent::MenuItemClick { id, .. } => {
        match id.as_str() {
          TRAY_MENU_QUIT => std::process::exit(0),
          TRAY_MENU_SETTING => {
            toggle_window(app);
          }, 
          _ => {}
        }
        
      }
      _ => {}
    })
    .build(tauri::generate_context!())
    .expect("error while running tauri application")
    .run(|_app_handle, event| match event {
      tauri::RunEvent::ExitRequested { api, .. } => {
        api.prevent_exit();
      }
      _ => {}
    });
}
