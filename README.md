This is public code for college website for physics department so for testing development I made this public for anyone if you're  a developer or frontend developer you can opt this 

## Return Distribution Diagnostics (Crypto / HFT)
Use `eth_return_diagnostics.py` to produce a higher-signal dashboard than a single histogram overlay.

```bash
python eth_return_diagnostics.py \
  --csv eth_1m_returns.csv \
  --col log_return \
  --title "ETH 1-Minute Returns" \
  --out eth_1m_diagnostics.png
```

The output includes:
- Histogram with **normal vs Student-t** overlays
- **Normal Q-Q plot** for shape mismatch
- **Log-scale survival tail plot**
- **Rolling skewness / excess kurtosis** regime checks
- **Empirical vs Normal vs Student-t VaR/ES** comparison table with normal-VaR bias
- Summary text with **1%/99% quantile asymmetry** for stop-loss sizing checks
