import DOMException from '../../src/exception/DOMException';
import DOMExceptionNameEnum from '../../src/exception/DOMExceptionNameEnum';
import CSSStyleSheet from '../../src/css/CSSStyleSheet';

describe('CSSStyleSheet', () => {
	let cssStyleSheet: CSSStyleSheet = null;

	beforeEach(() => {
		cssStyleSheet = new CSSStyleSheet();
	});

	describe('insertRule()', () => {
		it('Inserts a rule at an index.', () => {
			cssStyleSheet.insertRule('div { background-color: green }');
			cssStyleSheet.insertRule('span { background-color: green }');
			expect(cssStyleSheet.insertRule('button { background-color: green }', 1)).toBe(1);
		});

		it('Inserts a rule.', () => {
			cssStyleSheet.insertRule('div { background-color: green }');
			expect(cssStyleSheet.insertRule('span { background-color: green }')).toBe(1);
		});

		it('Throws error when a rule with invalid CSS is inserted.', () => {
			expect(() => {
				cssStyleSheet.insertRule('background-color: green');
			}).toThrowError(
				new DOMException('Invalid CSS rule.', DOMExceptionNameEnum.hierarchyRequestError)
			);
		});

		it('Throws error when attempting to add more than one rule.', () => {
			expect(() => {
				cssStyleSheet.insertRule(
					'div { background-color: green } span { background-color: green }'
				);
			}).toThrowError(
				new DOMException('Only one rule is allowed to be added.', DOMExceptionNameEnum.syntaxError)
			);
		});

		it('Throws error if index is more than the length of the CSS rule list.', () => {
			cssStyleSheet.insertRule('div { background-color: green }');

			expect(() => {
				cssStyleSheet.insertRule('button { background-color: green }', 2);
			}).toThrowError(
				new DOMException(
					'Index is more than the length of CSSRuleList.',
					DOMExceptionNameEnum.indexSizeError
				)
			);
		});
	});
});
