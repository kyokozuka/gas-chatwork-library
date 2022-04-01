interface Options {
  method: string;
  headers: object;
}

class Chatwork {
  // private token: string;
  private headers: object;
  private BASE_API: string = 'https://api.chatwork.com/v2';

  constructor(token: string) {
    this.headers  = {'X-ChatWorkToken': token};
  }

  private fetch(url: string, methods: string): object|null {
    try {
      const options: Options = {
        method: methods,
        headers: this.headers,
      };
      const results = UrlFetchApp.fetch(url, options);
      return JSON.parse(results.getContentText());
    } catch (e) {
      Logger.log(e)
      return null;
    }
  }

  /**
   * Get All rooms data
   * @returns 
   */
  public getRooms(): object|null {
    const url = `${this.BASE_API}/rooms/`;
    return this.fetch(url, 'GET');
  }

  /**
   * Get My room data
   * @returns object|null
   */
  public getMe(): object|null {
    const url = `${this.BASE_API}/me/`;
    return this.fetch(url, 'GET');
  }


  /**
   * Get Message from roomid
   * @param roomId 
   * @returns 
   */
  public getMessages(roomId): object|null {
    const url = `${this.BASE_API}/rooms/${roomId}/messages/`;
    const messages = this.fetch(url, 'GET');
    if (!messages || !Object.keys(messages).length) {
      return null;
    } else {
      return messages;
    }
  }
}