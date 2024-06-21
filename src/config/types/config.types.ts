export declare type AppConfigOption = {
  // Url of the application
  url: string;
  //   Secret of application for auth propose
  secret: string;

  expireIn: number | string;

  debug?: boolean;
};

