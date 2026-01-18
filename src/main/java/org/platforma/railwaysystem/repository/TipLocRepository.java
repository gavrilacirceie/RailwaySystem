package org.platforma.railwaysystem.repository;

import org.platforma.railwaysystem.model.TipLoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipLocRepository extends JpaRepository<TipLoc, Long> {}

