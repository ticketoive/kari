import concurrent.futures
import requests
from bs4 import BeautifulSoup

# 💡 ここに【送りたい希望の回数】（個数）を入力してください
TARGET_VOTE_COUNT = 10

# 1. 無料プロキシリストを自動で取得する関数
def fetch_free_proxies():
    print("最新の無料プロキシリストを取得中...")
    proxies = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        # 無料プロキシの大手サイト（HTTPS対応）から取得
        response = requests.get("https://sslproxies.org", headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")
        
        # テーブル内のIPとPortの行をループ処理
        table_rows = soup.select("#list tbody tr")
        for row in table_rows:
            cols = row.find_all("td")
            if len(cols) >= 2:
                ip = cols[0].text.strip()
                port = cols[1].text.strip()
                # 取得したIPとポートをプロキシの形式に整形
                proxies.append(f"http://{ip}:{port}")
                
        print(f"成功: {len(proxies)} 個のプロキシ候補を見つけました。\n")
        return proxies
    except Exception as e:
        print(f"プロキシリストの取得に失敗しました: {e}")
        return []

# 2. 投票を1回送信する関数
def vote(proxy_url, index):
    url = "https://leadi.jp"
    
    # 投票のデータ（JavaScriptのFormDataと同じ）
    form_data = {
        "voteItemId": "74"
    }
    
    # JavaScriptのコードに合わせ、Originだけを指定（Content-Typeはrequestsが自動生成）
    headers = {
        "Origin": "https://gunmachan-idolfes.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    # プロキシの設定（HTTPとHTTPS両方に適用）
    proxies_config = {
        "http": proxy_url,
        "https": proxy_url
    }
    
    try:
        # プロキシを経由してPOSTリクエストを送信（5秒でタイムアウト）
        response = requests.post(
            url, 
            data=form_data, 
            headers=headers, 
            proxies=proxies_config, 
            timeout=5
        )
        print(f"[リクエスト {index}] 使用IP: {proxy_url} -> ステータス: {response.status_code}")
        print(f"[リクエスト {index}] レスポンス: {response.text}")
    except Exception:
        # 無料プロキシは死んでいるものが多いため、大半がここ（通信失敗）に流れます
        print(f"[リクエスト {index}] 使用IP: {proxy_url} -> エラー: 通信失敗または拒否")

# 3. メイン処理（指定された個数だけ並列で一斉実行）
def main():
    proxy_list = fetch_free_proxies()
    
    if not proxy_list:
        print("有効なプロキシ候補がないため、処理を終了します。")
        return
        
    # 取得したプロキシ数と、指定された目標数のうち、少ない方を実際の実行回数にする
    actual_count = min(TARGET_VOTE_COUNT, len(proxy_list))
    
    print(f"【投票フェーズ開始】指定された {actual_count} 個のIPを使って一斉にリクエストを送信します...")
    
    # Pythonの並列処理（マルチスレッド）を使い、1つずつ待たずに一斉に送信する
    with concurrent.futures.ThreadPoolExecutor(max_workers=actual_count) as executor:
        # 指定した個数分だけプロキシを切り出して、並列実行
        futures = [
            executor.submit(vote, proxy_list[i], i + 1) 
            for i in range(actual_count)
        ]
        # すべてのスレッドが終了するのを待つ
        concurrent.futures.wait(futures)

if __name__ == "__main__":
    main()
