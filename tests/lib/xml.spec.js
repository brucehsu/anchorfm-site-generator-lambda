jest.mock('node-fetch');

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { fetchFeed } = require('../../lib/xml');

describe('XML Parsing', () => {
    const mockAnchorId = 'MOCK_ID';
    const mockFeedPath = path.join(__dirname, '..', 'mocks', 'feed.xml');
    test('fetch podcast feed and parse it into object', async() => {
        fetch.mockResolvedValue({
            text: jest.fn().mockResolvedValue(fs.readFileSync(mockFeedPath, 'utf8'))
        });
        const result = await fetchFeed(mockAnchorId);
        const { channel } = result.rss;
        expect(fetch.mock.calls.length).toBe(1);
        expect(fetch.mock.calls[0][0]).toBe(`https://anchor.fm/s/${mockAnchorId}/podcast/rss`);
        expect(channel.title).toBe('Taiwanese Expats in Tech');
        expect(channel['itunes:author']).toBe('Szu-Kai Hsu');
        expect(channel.lastBuildDate).toBe('Sun, 05 Jan 2020 15:50:16 GMT');
        expect(channel.item.length).toBe(3);
    });
});