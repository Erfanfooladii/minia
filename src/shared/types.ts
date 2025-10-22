// Telegram WebApp types
export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

// Global Telegram WebApp interface
export interface TelegramWebAppGlobal {
  WebApp?: TelegramWebApp;
}

// Extend Window interface
declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    chat_instance?: string;
    chat_type?: string;
    auth_date?: number;
    hash?: string;
  };
  version: string;
  platform: string;
  color_scheme: "light" | "dark";
  theme_params: {
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    hint_color?: string;
    bg_color?: string;
    text_color?: string;
  };
  is_expanded: boolean;
  viewport_height: number;
  viewport_stable_height: number;
  header_color: string;
  background_color: string;
  is_closing_confirmation_enabled: boolean;
  is_vertical_swipe_enabled: boolean;
  ready(): void;
  expand(): void;
  close(): void;
  send_data(data: string): void;
  open_link(url: string, options?: { try_instant_view?: boolean }): void;
  open_tg_link(url: string): void;
  open_invoice(url: string, callback?: (status: string) => void): void;
  show_popup(
    params: {
      title?: string;
      message: string;
      buttons?: Array<{
        id?: string;
        type?: "default" | "ok" | "close" | "cancel" | "destructive";
        text?: string;
      }>;
    },
    callback?: (button_id: string) => void
  ): void;
  show_alert(message: string, callback?: () => void): void;
  show_confirm(message: string, callback?: (confirmed: boolean) => void): void;
  show_scan_qr_popup(
    params: {
      text?: string;
    },
    callback?: (text: string) => void
  ): void;
  close_scan_qr_popup(): void;
  read_text_from_clipboard(callback?: (text: string) => void): void;
  request_write_access(callback?: (granted: boolean) => void): void;
  request_contact(callback?: (granted: boolean, contact?: any) => void): void;
  main_button: {
    text: string;
    color: string;
    text_color: string;
    is_visible: boolean;
    is_active: boolean;
    is_progress_visible: boolean;
    set_text(text: string): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    show_progress(leave_active?: boolean): void;
    hide_progress(): void;
    set_params(params: {
      text?: string;
      color?: string;
      text_color?: string;
      is_active?: boolean;
      is_visible?: boolean;
    }): void;
  };
  back_button: {
    is_visible: boolean;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
    show(): void;
    hide(): void;
  };
  haptic_feedback: {
    impact_occurred(
      style: "light" | "medium" | "heavy" | "rigid" | "soft"
    ): void;
    notification_occurred(type: "error" | "success" | "warning"): void;
    selection_changed(): void;
  };
  cloud_storage: {
    set_item(
      key: string,
      value: string,
      callback?: (error: string | null, result?: boolean) => void
    ): void;
    get_item(
      key: string,
      callback: (error: string | null, result?: string) => void
    ): void;
    get_items(
      keys: string[],
      callback: (error: string | null, result?: Record<string, string>) => void
    ): void;
    remove_item(
      key: string,
      callback?: (error: string | null, result?: boolean) => void
    ): void;
    remove_items(
      keys: string[],
      callback?: (error: string | null, result?: boolean) => void
    ): void;
    get_keys(callback: (error: string | null, result?: string[]) => void): void;
  };
  biometric_init(
    callback?: (error: string | null, encrypted_data?: string) => void
  ): void;
  biometric_request_access(
    params: {
      reason?: string;
    },
    callback?: (granted: boolean) => void
  ): void;
  biometric_request_auth(
    params: {
      reason?: string;
    },
    callback?: (error: string | null, token?: string) => void
  ): void;
  biometric_update_token(
    token: string,
    callback?: (error: string | null) => void
  ): void;
  biometric_open_settings(): void;
}

// App-specific types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
