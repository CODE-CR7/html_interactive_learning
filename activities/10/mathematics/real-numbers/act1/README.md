# Real Numbers Math Lab

A self-paced Class X mathematics activity. Learners choose a topic, change the values, and explore visual models and worked explanations. There are no exams, marks, or compulsory sequences.

## Getting started

Open [index.html](index.html) in a browser, or serve the repository with a local HTTP server. The activity contains its own HTML, CSS, and JavaScript and requires no build step or external dependencies.

1. Choose a learning topic in the sidebar.
2. Change the displayed numbers and leave the input to apply the change.
3. Choose factor pairs or follow division steps where available.
4. Use **Try an example** for sample values or **Reset** to restore the default topic and values.
5. Use **Copy setup link** to share the current topic and values. If clipboard access is unavailable, copy the address of **Open this setup**.

## Learning choices

| Topic | `focus` value | Exploration |
| --- | --- | --- |
| Factors & primes | `factors` | Positive factors, prime/composite classification, factor pairs, and rectangular arrangements. |
| Prime factorisation | `prime-factorization` | Prime powers, factor-pair breakdowns, and the Fundamental Theorem of Arithmetic. |
| HCF & LCM | `multiples` | Common factors, multiples, prime factorisation, and HCF × LCM = first number × second number. |
| Euclid’s algorithm | `euclid` | Division with remainders, one step at a time or all steps together. |
| Rational decimals | `decimals` | Fraction reduction and terminating or repeating decimal expansions. |
| Real-life grouping | `grouping` | Identical kits using HCF and coinciding events using LCM. |

## URL parameters

Append query parameters to `index.html` to set the starting topic and values.

| Parameter | Default | Accepted values | Used by |
| --- | --- | --- | --- |
| `number` | `36` | Whole numbers from 1 to 10000 | All topics except rational decimals |
| `compare_number` | `24` | Whole numbers from 1 to 10000 | HCF & LCM, Euclid’s algorithm, real-life grouping |
| `numerator` | `7` | Whole numbers from 0 to 10000 | Rational decimals |
| `denominator` | `40` | Whole numbers from 1 to 1000 | Rational decimals |
| `focus` | `factors` | One of the six values listed above | Starting learning topic |

Missing parameters use defaults. Invalid recognized parameters also use defaults, with a notice listing the affected parameters. Invalid input in the controls leaves the last valid setup in place and displays the allowed range.

Changing the topic or applying valid values updates the browser URL and setup link. All five settings are included, so values for other topics are retained when switching topics. The selected factor pair and the number of revealed Euclid steps are not stored in the URL.

### Examples

- [Explore the factors of 12](index.html?number=12&focus=factors)
- [Compare HCF and LCM for 48 and 18](index.html?number=48&compare_number=18&focus=multiples)
- [Follow Euclid’s algorithm for 48 and 18](index.html?number=48&compare_number=18&focus=euclid)
- [Explore the terminating decimal 7/40](index.html?numerator=7&denominator=40&focus=decimals)
- [Explore the repeating decimal 1/6](index.html?numerator=1&denominator=6&focus=decimals)
- [Make equal kits from 60 pencils and 24 notebooks](index.html?number=60&compare_number=24&focus=grouping)

## Display limits and mathematical conventions

- Individual rectangle tiles are drawn for numbers up to 120. Larger numbers show the selected row × column calculation.
- Each multiples list shows up to ten entries, then identifies the LCM if it lies beyond the preview.
- Decimal expansions show up to 120 decimal places. Detected repeating digits appear in parentheses; longer expansions show a truncated preview.
- The number 1 is neither prime nor composite and has no prime factors.
- Decimal classification uses the denominator of the reduced fraction. A decimal terminates when that denominator has only prime factors 2 and 5, or equals 1.

## Maintenance

The implementation and `activity-metadata` block are in [index.html](index.html). Keep the parameter schema, defaults, input limits, and this documentation consistent when changing the activity.

From the repository root, regenerate and check the activity catalog with:

```sh
ruby -E UTF-8:UTF-8 scripts/generate_catalog.rb
ruby -E UTF-8:UTF-8 scripts/generate_catalog.rb --check
python3 scripts/validate_activity_urls.py
```

The URL validation script checks the repository’s existing explanation links against declared parameter schemas.
