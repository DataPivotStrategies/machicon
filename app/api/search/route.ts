import { NextResponse } from 'next/server';

// 仮のデータベース（実際にはデータベースや外部APIから取得する）
const events = [
  { id: 1, area: '東京', date: '2023-10-15', participants: 50 },
  { id: 2, area: '大阪', date: '2023-10-20', participants: 30 },
  { id: 3, area: '名古屋', date: '2023-10-25', participants: 40 },
  { id: 4, area: '東京', date: '2023-11-01', participants: 100 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const area = searchParams.get('area');
  const date = searchParams.get('date');
  const participants = searchParams.get('participants');

  // フィルタリングロジック
  const filteredEvents = events.filter((event) => {
    return (
      (!area || event.area === area) &&
      (!date || event.date === date) &&
      (!participants || event.participants >= parseInt(participants))
    );
  });

  // 検索結果を返す
  return NextResponse.json(filteredEvents);
}