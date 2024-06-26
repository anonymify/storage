class File {
  static async upload(data) {
    const formData = new FormData();
    formData.append('file', new Blob([data], {
      type: 'image/png'
    }));

    const corsProxyApi = getUrlParameter('proxy') == 'true' ? 'https://cors-anywhere.herokuapp.com/' : '';

    const response = await fetch(`${corsProxyApi}https://telegra.ph/upload/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://telegra.ph',
      },
    });

    const jsonData = await response.json();

    if (jsonData.error) {
      throw new Error(jsonData.error);
    }

    return jsonData[0].src.replace('/file/', '').replace('.png', '');
  }

  static async read(id) {
    const corsProxyApi = getUrlParameter('proxy') == 'true' ? 'https://cors-anywhere.herokuapp.com/' : '';

    try {
      const response = await fetch(`${corsProxyApi}https://telegra.ph/file/${id}.png`);

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      return await response.arrayBuffer();
    } catch (error) {
      throw error;
    }
  }
}